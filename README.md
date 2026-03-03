# <img src="https://img.icons8.com/fluency/48/video.png" width="32"/> VideoFlow — AI-Powered Vertical Video Converter

<div align="center">

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.2-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Java](https://img.shields.io/badge/Java-25-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![OpenCV](https://img.shields.io/badge/OpenCV-4.11-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![License](https://img.shields.io/badge/License-Apache%202.0-D22128?style=for-the-badge)

**Convierte videos horizontales (16:9) a verticales (9:16) con inteligencia artificial que sigue al sujeto en tiempo real.**

[Empezar](#-inicio-rápido) · [Arquitectura](#-arquitectura) · [AI Service](#-ai-service-tracking-inteligente) · [API Docs](#-documentación-api) · [Equipo](#-equipo)

</div>

---

## ✨ ¿Qué hace VideoFlow?

VideoFlow automatiza lo que un editor haría manualmente: convertir un video horizontal a formato vertical para redes sociales, **centrando inteligentemente al sujeto principal**.

<table>
<tr>
<td width="50%">

### Sin IA (recorte estático)
```
┌────────────────────────┐
│        ┌──────┐        │
│        │ CROP │        │
│        │      │        │
│        │  😐  │ → 😐   │  El sujeto se sale
│        │      │   sale  │  del encuadre
│        └──────┘        │
└────────────────────────┘
```

</td>
<td width="50%">

### Con IA (tracking dinámico) ✨
```
┌────────────────────────┐
│  ┌──────┐              │
│  │ CROP │              │
│  │      │              │
│  │  😀  │──→ ──→ ──→   │  El crop SIGUE
│  │      │  ┌──────┐    │  al sujeto
│  └──────┘  │  😀  │    │
│            └──────┘    │
└────────────────────────┘
```

</td>
</tr>
</table>

### Características principales

| Característica | Descripción |
|---|---|
| 🎯 **Detección de rostros** | OpenCV + Haar Cascade detecta al sujeto principal |
| 🎬 **Tracking dinámico** | El recorte sigue al sujeto a lo largo del video con transiciones suaves |
| ⏱ **Corte por segmentos** | Soporta recorte temporal (inicio/fin) antes de la conversión |
| 🔄 **Procesamiento async** | Los videos se procesan en segundo plano sin bloquear la API |
| 🐳 **Docker ready** | Un solo comando levanta toda la infraestructura |
| 📡 **API REST + Swagger** | Documentación interactiva integrada |
| 🧹 **Limpieza automática** | Los videos se eliminan automáticamente después de 30 minutos |

---

## 🏗 Arquitectura

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────────┐
│             │     │                  │     │                 │
│   Frontend  │────▶│     Backend      │────▶│   AI Service    │
│  Next.js 16 │     │  Spring Boot 4   │     │ FastAPI+OpenCV  │
│  Port 3000  │     │   Port 8080      │     │   Port 8000     │
│             │     │                  │     │                 │
└─────────────┘     └────────┬─────────┘     └────────┬────────┘
                             │                        │
                    ┌────────▼─────────┐    ┌─────────▼────────┐
                    │    MySQL 8.0     │    │  Shared Volume   │
                    │  conversion_jobs │    │ /app/videos_subi │
                    │    Port 3306     │    │     dos          │
                    └──────────────────┘    └──────────────────┘
```

### Flujo de procesamiento

```
📤 Upload Video
    │
    ▼
💾 Guardar en volumen compartido (videos_subidos/)
    │
    ▼
🔍 Estado: ANALYZING
    │  ← ai-service analiza 1 frame cada 2 segundos
    │  ← Detecta rostros con OpenCV
    │  ← Devuelve lista de posiciones por segmento temporal
    ▼
🎬 Estado: PROCESSING
    │  ← FFmpeg aplica crop dinámico con interpolación lineal
    │  ← El recorte sigue al sujeto suavemente
    ▼
✅ Estado: COMPLETED → Video vertical listo para descargar
```

---

## 🚀 Inicio Rápido

### Prerrequisitos

- **Docker** y **Docker Compose** instalados
- **Git**

### 1. Clonar el repositorio

```bash
git clone https://github.com/No-Country-simulation/S02-26-09-WebApp-Converter.git
cd S02-26-09-WebApp-Converter
```

### 2. Levantar con IA habilitada (recomendado)

```bash
docker compose --profile ai up --build
```

Esto levanta **4 servicios**:

| Servicio | Puerto | Descripción |
|---|---|---|
| `videoflow-frontend` | `3000` | Interfaz web (Next.js) |
| `videoflow-backend` | `8080` | API REST (Spring Boot) |
| `videoflow-ai-service` | `8000` | Análisis de video (FastAPI + OpenCV) |
| `mysql-db-shortify` | `3306` | Base de datos (MySQL 8) |

### 3. Levantar sin IA

```bash
docker compose up --build
```

> Sin IA, los videos se recortan centrados (sin tracking del sujeto).

### 4. Detener todo

```bash
# Si levantaste con --profile ai:
docker compose --profile ai down

# Para también borrar volúmenes (reset completo):
docker compose --profile ai down -v
```

### Accesos rápidos

| Recurso | URL |
|---|---|
| 🌐 Frontend | http://localhost:3000 |
| 📡 API Backend | http://localhost:8080 |
| 📖 Swagger UI | http://localhost:8080/swagger-ui/index.html |
| 🤖 AI Health | http://localhost:8000/health |

---

## 🤖 AI Service — Tracking Inteligente

El microservicio de IA (`ai-service/`) es el cerebro detrás del recorte inteligente.

### ¿Cómo funciona?

1. **Extrae frames** del video a intervalos regulares (cada 2 segundos por defecto)
2. **Detecta rostros** en cada frame usando OpenCV Haar Cascade
3. **Calcula `crop_x`** para cada momento, determinando dónde centrar el recorte
4. **Suaviza transiciones** — si pierde el rostro momentáneamente, mantiene la última posición conocida
5. El backend **construye una expresión FFmpeg** con interpolación lineal entre puntos

### Ejemplo de análisis

Para un video de 10 segundos:

```json
{
  "segments": [
    { "time": 0.0,  "crop_x": 100 },
    { "time": 2.0,  "crop_x": 180 },
    { "time": 4.0,  "crop_x": 320 },
    { "time": 6.0,  "crop_x": 250 },
    { "time": 8.0,  "crop_x": 200 }
  ],
  "subject_found": true,
  "duration": 10.0
}
```

El resultado: una **"cámara virtual"** que sigue al sujeto suavemente a lo largo del video.

### Tech Stack del AI Service

| Tecnología | Uso |
|---|---|
| **Python 3.12** | Runtime |
| **FastAPI** | Framework web async |
| **OpenCV** (headless) | Detección de rostros |
| **NumPy** | Procesamiento de arrays |
| **Uvicorn** | Servidor ASGI |

---

## 📡 Documentación API

> **Swagger UI completo**: http://localhost:8080/swagger-ui/index.html

### `POST /api/conversions/upload`

Sube un video y crea un job de conversión asíncrono.

```bash
curl -X POST http://localhost:8080/api/conversions/upload \
  -F "file=@mi_video.mp4" \
  -F "startTime=00:00:05" \
  -F "endTime=00:00:30"
```

### `GET /api/conversions/{id}`

Consulta el estado del job.

### `GET /out/{filename}`

Descarga el video convertido.

> Ver documentación completa en el [README del Backend](./backend/README.md).

---

## 🛠 Tech Stack Completo

### Frontend
| Tecnología | Versión |
|---|---|
| Next.js | 16.1 |
| React | 19.2 |
| TypeScript | 5.x |
| Tailwind CSS | 4.x |
| Lucide React | Icons |
| pnpm | Package manager |

### Backend
| Tecnología | Versión |
|---|---|
| Java | 25 |
| Spring Boot | 4.0.2 |
| Spring Data JPA | Hibernate |
| MySQL | 8.0 |
| FFmpeg | Latest |
| Springdoc OpenAPI | 3.0 (Swagger) |
| Maven | Build tool |

### AI Service
| Tecnología | Versión |
|---|---|
| Python | 3.12 |
| FastAPI | 0.115 |
| OpenCV (headless) | 4.11 |
| NumPy | 2.2 |

### Infraestructura
| Tecnología | Uso |
|---|---|
| Docker Compose | Orquestación |
| Docker Volumes | Almacenamiento compartido |
| Multi-stage builds | Imágenes optimizadas |

---

## ⚙️ Variables de Entorno

| Variable | Default | Descripción |
|---|---|---|
| `AI_SERVICE_ENABLED` | `true` | Habilita/deshabilita el análisis IA |
| `AI_SERVICE_URL` | `http://ai-service:8000` | URL del microservicio de IA |
| `SPRING_DATASOURCE_URL` | `jdbc:mysql://mysql-db:3306/db-shortify` | URL de conexión MySQL |
| `SPRING_DATASOURCE_PASSWORD` | `1234` | Contraseña MySQL |

---

## 👥 Equipo

<table>
<tr>
<td align="center"><b>Natividad Romero</b><br/>UX/UI Designer<br/><a href="https://www.linkedin.com/in/natyromero/">LinkedIn</a></td>
<td align="center"><b>Christian Iván Ledesma</b><br/>Frontend Developer<br/><a href="https://www.linkedin.com/in/christian-ivan-ledesma-800660268">LinkedIn</a></td>
<td align="center"><b>Hector Duarte</b><br/>Frontend Developer<br/><a href="https://www.linkedin.com/in/hector-duarte">LinkedIn</a></td>
<td align="center"><b>Iván Sierra</b><br/>Backend Developer<br/><a href="https://linkedin.com/in/isierra93">LinkedIn</a></td>
<td align="center"><b>Martin Rioja</b><br/>Backend Developer<br/><a href="https://www.linkedin.com/in/martinriojac/">LinkedIn</a></td>
</tr>
</table>

---

## 📄 Licencia

Este proyecto está bajo la licencia **Apache 2.0**. Ver [LICENSE](./LICENSE) para más detalles.
