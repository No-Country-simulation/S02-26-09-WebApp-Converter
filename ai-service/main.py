"""
AI Video Analysis Microservice
================================
FastAPI + OpenCV service that analyzes a video file and returns
crop positions for vertical (9:16) conversion.

Endpoints:
  - GET  /health              → Service health check
  - POST /analyze             → Single crop_x for the entire video (legacy)
  - POST /analyze-segments    → Dynamic tracking: list of {time, crop_x} segments
"""

import cv2
import numpy as np
import os
import logging
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s - %(message)s",
)
logger = logging.getLogger("ai-service")

# ---------------------------------------------------------------------------
# FastAPI app
# ---------------------------------------------------------------------------
app = FastAPI(
    title="VideoFlow AI Service",
    description="Analyzes videos with OpenCV to return optimal crop positions.",
    version="2.0.0",
)

# ---------------------------------------------------------------------------
# Haar Cascade classifier (bundled with OpenCV — no download needed)
# ---------------------------------------------------------------------------
CASCADE_PATH = cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
face_cascade = cv2.CascadeClassifier(CASCADE_PATH)

# ---------------------------------------------------------------------------
# Models
# ---------------------------------------------------------------------------
class AnalyzeRequest(BaseModel):
    video_path: str

class AnalyzeSegmentsRequest(BaseModel):
    video_path: str
    segment_duration: float = 2.0  # seconds between samples

class AnalyzeResponse(BaseModel):
    crop_x: int
    subject_found: bool
    confidence: float
    message: str

class CropSegment(BaseModel):
    time: float
    crop_x: int

class AnalyzeSegmentsResponse(BaseModel):
    segments: list[CropSegment]
    frame_width: int
    frame_height: int
    fps: float
    duration: float
    subject_found: bool
    message: str


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def extract_frames(video_path: str, max_frames: int = 10) -> list[np.ndarray]:
    """
    Evenly samples up to `max_frames` frames from the video.
    Returns a list of BGR numpy arrays.
    """
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        raise ValueError(f"No se pudo abrir el video: {video_path}")

    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    if total_frames == 0:
        cap.release()
        raise ValueError("El video no tiene frames.")

    # Calculate even-spaced positions
    sample_count = min(max_frames, total_frames)
    positions = np.linspace(0, total_frames - 1, sample_count, dtype=int)

    frames = []
    for pos in positions:
        cap.set(cv2.CAP_PROP_POS_FRAMES, int(pos))
        ret, frame = cap.read()
        if ret:
            frames.append(frame)

    cap.release()
    logger.info("Extraídos %d frames del video.", len(frames))
    return frames


def extract_frames_at_intervals(video_path: str, interval_sec: float) -> tuple[list[tuple[float, np.ndarray]], int, int, float, float]:
    """
    Extracts one frame every `interval_sec` seconds.
    Returns:
      - list of (timestamp_seconds, frame_bgr) tuples
      - frame_width
      - frame_height
      - fps
      - duration_seconds
    """
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        raise ValueError(f"No se pudo abrir el video: {video_path}")

    fps = cap.get(cv2.CAP_PROP_FPS)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

    if fps <= 0 or total_frames <= 0:
        cap.release()
        raise ValueError("No se pudo leer FPS o frame count del video.")

    duration = total_frames / fps
    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    # Calculate which timestamps to sample
    timestamps = []
    t = 0.0
    while t < duration:
        timestamps.append(t)
        t += interval_sec
    # Always include the last moment if not already close
    if duration - timestamps[-1] > interval_sec * 0.3:
        timestamps.append(duration - 0.1)

    results = []
    for ts in timestamps:
        frame_pos = int(ts * fps)
        frame_pos = min(frame_pos, total_frames - 1)
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_pos)
        ret, frame = cap.read()
        if ret:
            results.append((ts, frame))

    cap.release()
    logger.info("Extraídos %d frames a intervalos de %.1fs (duración: %.1fs)",
                len(results), interval_sec, duration)
    return results, frame_width, frame_height, fps, duration


def detect_face_x_in_frame(frame: np.ndarray) -> tuple[int | None, float]:
    """
    Detects the largest face in a single frame.
    Returns (centroid_x, confidence) or (None, 0.0).
    """
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(60, 60),
    )

    if len(faces) == 0:
        return None, 0.0

    # Find the largest face
    best_area = 0
    best_cx = None
    for (x, y, w, h) in faces:
        area = w * h
        if area > best_area:
            best_area = area
            best_cx = x + w // 2

    confidence = min(0.95, best_area / (200 * 200))
    return best_cx, round(confidence, 2)


def detect_best_face_x(frames: list[np.ndarray]) -> tuple[int | None, float]:
    """
    Runs face detection on each frame.
    Returns (centroid_x, confidence) of the largest face found across all frames,
    or (None, 0.0) if no face is detected.
    """
    best_face_area = 0
    best_cx: int | None = None

    for frame in frames:
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(
            gray,
            scaleFactor=1.1,
            minNeighbors=5,
            minSize=(60, 60),
        )

        for (x, y, w, h) in faces:
            area = w * h
            if area > best_face_area:
                best_face_area = area
                best_cx = x + w // 2  # centroid X of the bounding box

    if best_cx is None:
        return None, 0.0

    # Simple confidence heuristic: larger face → more confidence
    # Cap at 0.95 since Haar Cascades are not calibrated classifiers
    confidence = min(0.95, best_face_area / (200 * 200))
    return best_cx, round(confidence, 2)


def compute_crop_x(subject_cx: int, frame_width: int, frame_height: int) -> int:
    """
    Given the centroid X of the subject and the video dimensions,
    computes the left X coordinate for a 9:16 crop window.

    FFmpeg crop filter: crop=crop_w:crop_h:crop_x:0
    where crop_w = frame_height * 9 / 16
    """
    crop_width = int(frame_height * 9 / 16)
    crop_x = subject_cx - crop_width // 2

    # Clamp: crop window must stay within the frame
    crop_x = max(0, min(crop_x, frame_width - crop_width))
    return crop_x


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@app.get("/health")
def health():
    return {"status": "ok", "service": "ai-service"}


@app.post("/analyze", response_model=AnalyzeResponse)
def analyze(request: AnalyzeRequest):
    """Legacy endpoint: returns a single crop_x for the entire video."""
    video_path = request.video_path
    logger.info("Solicitud de análisis recibida. video_path=%s", video_path)

    # --- Validaciones ---
    if not os.path.exists(video_path):
        logger.error("Archivo no encontrado: %s", video_path)
        raise HTTPException(
            status_code=404,
            detail=f"El archivo de video no existe en la ruta: {video_path}",
        )

    # --- Extraer frames ---
    try:
        frames = extract_frames(video_path, max_frames=10)
    except ValueError as e:
        logger.error("Error extrayendo frames: %s", e)
        raise HTTPException(status_code=422, detail=str(e))

    if not frames:
        raise HTTPException(status_code=422, detail="No se pudieron extraer frames del video.")

    # Read dimensions from the first frame
    frame_height, frame_width = frames[0].shape[:2]
    center_x = frame_width // 2

    # --- Detección de rostros ---
    subject_cx, confidence = detect_best_face_x(frames)

    if subject_cx is not None:
        crop_x = compute_crop_x(subject_cx, frame_width, frame_height)
        logger.info(
            "Sujeto detectado en x=%d. crop_x calculado: %d (confianza: %.2f)",
            subject_cx, crop_x, confidence,
        )
        return AnalyzeResponse(
            crop_x=crop_x,
            subject_found=True,
            confidence=confidence,
            message=f"Sujeto detectado. Crop x={crop_x} sugerido para centrar el sujeto.",
        )
    else:
        # Fallback: center crop
        crop_x = compute_crop_x(center_x, frame_width, frame_height)
        logger.info("No se detectó sujeto. Usando crop centrado: crop_x=%d", crop_x)
        return AnalyzeResponse(
            crop_x=crop_x,
            subject_found=False,
            confidence=0.0,
            message="No se detectó sujeto principal. Se usará el crop centrado como fallback.",
        )


@app.post("/analyze-segments", response_model=AnalyzeSegmentsResponse)
def analyze_segments(request: AnalyzeSegmentsRequest):
    """
    Dynamic tracking endpoint: analyzes the video at regular intervals
    and returns a list of crop_x positions over time.
    The backend can use these to build an FFmpeg expression that follows
    the subject as they move.
    """
    video_path = request.video_path
    interval = max(0.5, request.segment_duration)  # min 0.5s

    logger.info("Solicitud de análisis por segmentos. video_path=%s, interval=%.1fs",
                video_path, interval)

    # --- Validaciones ---
    if not os.path.exists(video_path):
        logger.error("Archivo no encontrado: %s", video_path)
        raise HTTPException(
            status_code=404,
            detail=f"El archivo de video no existe en la ruta: {video_path}",
        )

    # --- Extraer frames a intervalos ---
    try:
        timed_frames, frame_width, frame_height, fps, duration = \
            extract_frames_at_intervals(video_path, interval)
    except ValueError as e:
        logger.error("Error extrayendo frames: %s", e)
        raise HTTPException(status_code=422, detail=str(e))

    if not timed_frames:
        raise HTTPException(status_code=422, detail="No se pudieron extraer frames del video.")

    center_x = frame_width // 2
    any_subject_found = False
    segments: list[CropSegment] = []

    # Previous crop_x for smoothing when face is temporarily lost
    last_crop_x = compute_crop_x(center_x, frame_width, frame_height)

    for ts, frame in timed_frames:
        face_cx, confidence = detect_face_x_in_frame(frame)

        if face_cx is not None:
            crop_x = compute_crop_x(face_cx, frame_width, frame_height)
            any_subject_found = True
            last_crop_x = crop_x
        else:
            # If no face in this frame, keep the last known position
            # This prevents jumps when the face is briefly undetected
            crop_x = last_crop_x

        segments.append(CropSegment(time=round(ts, 2), crop_x=crop_x))
        logger.debug("t=%.2f → face_cx=%s → crop_x=%d", ts, face_cx, crop_x)

    logger.info("Análisis por segmentos completado: %d segmentos, sujeto_encontrado=%s",
                len(segments), any_subject_found)

    return AnalyzeSegmentsResponse(
        segments=segments,
        frame_width=frame_width,
        frame_height=frame_height,
        fps=fps,
        duration=round(duration, 2),
        subject_found=any_subject_found,
        message=f"Análisis dinámico: {len(segments)} segmentos cada {interval}s."
            if any_subject_found
            else "No se detectó sujeto. Todos los segmentos usan crop centrado.",
    )
