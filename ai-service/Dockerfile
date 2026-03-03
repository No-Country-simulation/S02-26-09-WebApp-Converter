# ==========================================
# AI Video Analysis Service — Dockerfile
# ==========================================
# Multi-stage build to keep the final image lean.
# Uses python:3.12-slim as base (small, no GUI needed).
# opencv-python-headless avoids pulling in X11/GTK deps.
# ==========================================

FROM python:3.12-slim

WORKDIR /app

# System deps: libGL for OpenCV (even headless needs libgthread),
# curl for HEALTHCHECK, and ffmpeg is NOT needed here.
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        libglib2.0-0 \
        libgl1 \
        curl && \
    rm -rf /var/lib/apt/lists/*

# Install Python dependencies first (Docker cache optimization)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application source
COPY main.py .

# Expose FastAPI port
EXPOSE 8000

# Health check: verify the service is responding
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD curl -f http://localhost:8000/health || exit 1

# Start Uvicorn (single worker is fine for video analysis workload)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
