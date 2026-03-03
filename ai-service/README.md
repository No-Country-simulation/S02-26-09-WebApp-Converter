# <img src="https://img.icons8.com/fluency/48/artificial-intelligence.png" width="32"/> VideoFlow AI Service

<div align="center">

![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![OpenCV](https://img.shields.io/badge/OpenCV-4.11-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white)
![NumPy](https://img.shields.io/badge/NumPy-2.2-013243?style=for-the-badge&logo=numpy&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)

**Microservicio de análisis de video con OpenCV que detecta rostros y calcula posiciones de recorte dinámicas para conversión vertical (9:16).**

[Cómo funciona](#-cómo-funciona) · [Endpoints](#-endpoints) · [Ejecución](#-ejecución) · [Configuración](#%EF%B8%8F-variables-de-entorno)

</div>

---

## ✨ ¿Qué hace este servicio?

El AI Service es el **cerebro** detrás del recorte inteligente de VideoFlow. Analiza videos cuadro a cuadro para detectar al sujeto principal y devolver las posiciones óptimas de recorte, permitiendo que el Backend construya un crop dinámico que **sigue al sujeto** a lo largo del video.

```
Input: Video horizontal (16:9)

  Frame t=0s         Frame t=2s         Frame t=4s
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ 😀           │  │     😀       │  │          😀  │
│  ▲           │  │      ▲       │  │           ▲  │
│  │           │  │      │       │  │           │  │
└──┼───────────┘  └──────┼───────┘  └───────────┼──┘
   │                     │                      │
   ▼                     ▼                      ▼
crop_x=50           crop_x=200            crop_x=380

Output: Lista de segmentos {time, crop_x} para tracking dinámico
```

---

## 📐 Estructura del Proyecto

```
ai-service/
├── main.py           # Aplicación FastAPI completa (endpoints + lógica)
├── requirements.txt  # Dependencias Python
├── Dockerfile        # Imagen Docker optimizada (python:3.12-slim)
└── .env.example      # Variables de entorno de referencia
```

---

## 🧠 ¿Cómo funciona?

### Pipeline de análisis

```
📹 Video Path (volumen compartido)
     │
     ▼
🎞  Extracción de frames a intervalos regulares (cada N segundos)
     │
     ▼
👤  Detección de rostros con OpenCV Haar Cascade
     │  ├── Encuentra el rostro más grande en cada frame
     │  └── Calcula el centroide X del bounding box
     │
     ▼
📐  Cálculo de crop_x
     │  ├── Centra la ventana 9:16 sobre el sujeto
     │  └── Clampea para no salirse del frame
     │
     ▼
🔄  Suavizado
     │  └── Si pierde el rostro momentáneamente, mantiene última posición
     │
     ▼
📊  Respuesta: lista de {time, crop_x} por segmento temporal
```

### Detección de rostros

Se utiliza **Haar Cascade** (`haarcascade_frontalface_default.xml`), clasificador incluido con OpenCV — no requiere descarga ni configuración adicional.

| Parámetro | Valor | Descripción |
|---|---|---|
| `scaleFactor` | `1.1` | Factor de escala para la pirámide de imágenes |
| `minNeighbors` | `5` | Mínimas detecciones vecinas para confirmar un rostro |
| `minSize` | `60×60` | Tamaño mínimo de rostro (filtra falsos positivos) |

### Cálculo de `crop_x`

```python
crop_width = frame_height * 9 / 16    # Ancho de ventana vertical
crop_x = subject_cx - crop_width / 2  # Centrar sobre el sujeto
crop_x = clamp(crop_x, 0, frame_width - crop_width)  # No salir del frame
```

### Confianza

La confianza se calcula como heurística basada en el área del rostro detectado:

```python
confidence = min(0.95, face_area / (200 * 200))
```

> Se limita a **0.95** ya que Haar Cascade no es un clasificador calibrado.

---

## 📡 Endpoints

Base URL: `http://localhost:8000`

### `GET /health` — Health Check

Verifica que el servicio está activo.

```bash
curl http://localhost:8000/health
```

**Respuesta — `200 OK`:**

```json
{ "status": "ok", "service": "ai-service" }
```

---

### `POST /analyze-segments` — Tracking dinámico ⭐

Analiza el video a intervalos regulares y devuelve una lista de posiciones de recorte a lo largo del tiempo. **Este es el endpoint principal** usado por el Backend.

**Request Body:**

```json
{
  "video_path": "/app/videos_subidos/1735000000000_mi_video.mp4",
  "segment_duration": 2.0
}
```

| Campo | Tipo | Default | Descripción |
|---|---|---|---|
| `video_path` | `string` | — | Ruta absoluta al video en el volumen compartido |
| `segment_duration` | `float` | `2.0` | Intervalo en segundos entre muestras (mín. 0.5s) |

**Respuesta — `200 OK`:**

```json
{
  "segments": [
    { "time": 0.0,  "crop_x": 100 },
    { "time": 2.0,  "crop_x": 180 },
    { "time": 4.0,  "crop_x": 320 },
    { "time": 6.0,  "crop_x": 250 },
    { "time": 8.0,  "crop_x": 200 }
  ],
  "frame_width": 1920,
  "frame_height": 1080,
  "fps": 30.0,
  "duration": 10.0,
  "subject_found": true,
  "message": "Análisis dinámico: 5 segmentos cada 2.0s."
}
```

| Campo | Tipo | Descripción |
|---|---|---|
| `segments` | `CropSegment[]` | Lista de `{time, crop_x}` ordenados cronológicamente |
| `frame_width` | `int` | Ancho del video original en píxeles |
| `frame_height` | `int` | Alto del video original en píxeles |
| `fps` | `float` | Frames por segundo del video |
| `duration` | `float` | Duración total del video en segundos |
| `subject_found` | `bool` | Si se detectó al menos un rostro en algún frame |
| `message` | `string` | Mensaje descriptivo del resultado |

---

### `POST /analyze` — Análisis estático (legacy)

Devuelve un único `crop_x` para todo el video. **Endpoint legacy**, mantenido por retrocompatibilidad.

**Request Body:**

```json
{
  "video_path": "/app/videos_subidos/1735000000000_mi_video.mp4"
}
```

**Respuesta — `200 OK`:**

```json
{
  "crop_x": 340,
  "subject_found": true,
  "confidence": 0.85,
  "message": "Sujeto detectado. Crop x=340 sugerido para centrar el sujeto."
}
```

---

## ❌ Manejo de Errores

| Código | Causa | Detalle |
|---|---|---|
| `404` | Archivo no encontrado | La ruta `video_path` no existe en el volumen compartido |
| `422` | Video inválido | No se pudieron extraer frames, FPS=0, o video corrupto |

**Ejemplo de error:**

```json
{
  "detail": "El archivo de video no existe en la ruta: /app/videos_subidos/video.mp4"
}
```

---

## 🛠 Tech Stack

| Tecnología | Versión | Uso |
|---|---|---|
| **Python** | 3.12 | Runtime |
| **FastAPI** | 0.115.8 | Framework web async |
| **OpenCV** (headless) | 4.11.0 | Detección de rostros (Haar Cascade) |
| **NumPy** | 2.2.3 | Procesamiento de arrays de frames |
| **Uvicorn** | 0.34.0 | Servidor ASGI |

---

## ⚙️ Variables de Entorno

| Variable | Default | Descripción |
|---|---|---|
| `PORT` | `8000` | Puerto de escucha de Uvicorn |
| `LOG_LEVEL` | `INFO` | Nivel de logging (`DEBUG`, `INFO`, `WARNING`, `ERROR`) |

> Copiar `.env.example` como `.env` para sobreescribir valores por defecto.

---

## 🐳 Docker

### Dockerfile

La imagen usa un build optimizado sobre `python:3.12-slim`:

```
python:3.12-slim
    │
    ├── Sistema: libglib2.0, libgl1, curl
    ├── Python: requirements.txt (fastapi, opencv, numpy, uvicorn)
    └── App: main.py
```

**Características:**
- ✅ **Imagen ligera** — `python:3.12-slim` sin dependencias de GUI
- ✅ **OpenCV headless** — Sin X11/GTK, solo procesamiento de imágenes
- ✅ **Cache de dependencias** — `requirements.txt` se instala antes de copiar el código
- ✅ **Health check** — Verificación cada 30s via `curl /health`

### Levantar con Docker Compose (desde la raíz del proyecto)

```bash
# Con IA habilitada (recomendado)
docker compose --profile ai up --build

# Solo el ai-service
docker compose --profile ai up --build ai-service
```

### Build manual

```bash
cd ai-service
docker build -t videoflow-ai-service .
docker run -p 8000:8000 -v ./videos_subidos:/app/videos_subidos videoflow-ai-service
```

---

## 🏃 Ejecución Local (sin Docker)

### Prerrequisitos

- **Python 3.12+**
- **pip**

### Instalación

```bash
cd ai-service
pip install -r requirements.txt
```

### Ejecución

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

O con recarga automática para desarrollo:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### Verificar que funciona

```bash
curl http://localhost:8000/health
# → {"status": "ok", "service": "ai-service"}
```

---

## 🔗 Integración con el Backend

El Backend (Spring Boot) se comunica con este servicio via HTTP:

```
Backend                           AI Service
   │                                  │
   │  POST /analyze-segments          │
   │  { video_path, segment_duration} │
   │ ─────────────────────────────▶   │
   │                                  │  Extrae frames
   │                                  │  Detecta rostros
   │                                  │  Calcula crop_x
   │  { segments, subject_found, ...} │
   │ ◀─────────────────────────────   │
   │                                  │
   │  Construye expresión FFmpeg      │
   │  con interpolación lineal        │
   │                                  │
```

| Aspecto | Detalle |
|---|---|
| **Volumen compartido** | `videos_subidos/` — ambos servicios acceden al mismo archivo |
| **Timeout de conexión** | 5 segundos (configurado en el Backend) |
| **Timeout de lectura** | 30 segundos (para videos largos) |
| **Fallback** | Si el AI Service no responde → el Backend usa crop centrado |
| **Feature flag** | `AI_SERVICE_ENABLED=true/false` en el Backend |

---

## 📖 Documentación interactiva

FastAPI genera documentación automática basada en los modelos Pydantic:

| Recurso | URL |
|---|---|
| 📖 Swagger UI | http://localhost:8000/docs |
| 📄 ReDoc | http://localhost:8000/redoc |
| 🔧 OpenAPI JSON | http://localhost:8000/openapi.json |
