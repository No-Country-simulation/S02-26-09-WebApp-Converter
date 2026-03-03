# <img src="https://img.icons8.com/fluency/48/api-settings.png" width="32"/> Video Converter API

<div align="center">

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.2-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Java](https://img.shields.io/badge/Java-25-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![FFmpeg](https://img.shields.io/badge/FFmpeg-Latest-007808?style=for-the-badge&logo=ffmpeg&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-OpenAPI%203-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)

**API REST para conversión automática de videos horizontales (16:9) a verticales (9:16) con tracking inteligente de sujeto vía IA.**

</div>

---

## 📐 Arquitectura del Proyecto

```
src/main/java/com/nocountry/videoconverter/
├── configs/              # Configuraciones (CORS, Async, AI RestClient)
│   ├── AiServiceConfig   # Bean RestClient para comunicación con ai-service
│   ├── AsyncCutterConfig  # Pool de hilos para procesamiento async
│   └── WebConfig          # CORS + servir videos estáticos
├── controllers/
│   └── ConversionJobController   # Endpoints REST
├── dto/
│   ├── ConversionJobDto    # Respuesta al frontend
│   └── ErrorDto            # Estructura de errores
├── entities/
│   ├── ConversionJob       # Entidad JPA principal
│   └── JobStatus           # Enum de estados del job
├── exceptions/
│   ├── business/           # EmptyFileException, ResourceNotFoundException
│   └── technical/          # StorageException
├── mappers/
│   └── ConversionJobMapper # Entity → DTO
├── repositories/
│   └── ConversionJobRepository
└── services/
    ├── ConversionJobService   # Orquesta: guardar → analizar → cortar
    ├── VideoAnalysisService   # Comunicación con ai-service + expr builder
    ├── VideoCutterService     # Ejecuta FFmpeg con crop dinámico
    ├── VideoStorageService    # Almacena videos en volumen compartido
    └── VideoCleanupScheduler  # Limpieza automática cada 60s
```

---

## 🔄 Flujo de Procesamiento

```
POST /api/conversions/upload
         │
         ▼
┌─────────────────────────────────────────────────────────────────┐
│  ConversionJobService.createJob()                               │
│                                                                 │
│  1. 💾 VideoStorageService.save()                               │
│     └── Guarda el video en videos_subidos/ (volumen compartido) │
│                                                                 │
│  2. 🔍 Estado → ANALYZING                                      │
│     └── VideoAnalysisService.analyze()                          │
│         ├── POST /analyze-segments → ai-service                 │
│         ├── Recibe: [{time: 0, crop_x: 100}, {time: 2, ...}]   │
│         └── Construye expresión FFmpeg con interpolación lineal │
│                                                                 │
│  3. 🎬 Estado → PROCESSING                                     │
│     └── VideoCutterService.cut()  (async)                       │
│         ├── FFmpeg con crop dinámico: crop=W:H:EXPRESSION:0     │
│         └── El crop sigue al sujeto suavemente                  │
│                                                                 │
│  4. ✅ Estado → COMPLETED                                       │
│     └── outputUrl = /out/video_vertical.mp4                     │
└─────────────────────────────────────────────────────────────────┘
```

### Integración con AI Service

El `VideoAnalysisService` se comunica con el microservicio Python (`ai-service`) via HTTP:

| Aspecto | Detalle |
|---|---|
| **Endpoint llamado** | `POST /analyze-segments` |
| **Transporte** | `RestClient` (Spring Boot 4) |
| **Timeout conexión** | 5 segundos |
| **Timeout lectura** | 30 segundos |
| **Fallback** | Si IA no responde → crop centrado (sin error) |
| **Volumen compartido** | `videos_subidos/` → ambos servicios acceden al mismo archivo |

La expresión FFmpeg generada usa interpolación lineal:

```
crop=ih*9/16:ih:if(between(t,0,2),100+(80)*(t-0)/2,if(between(t,2,4),180+...)):0
                ▲                                                           ▲
                └── crop_x cambia suavemente con t (tiempo en segundos) ────┘
```

---

## ⚙️ Configuración

### Variables de entorno

| Variable | Default | Descripción |
|---|---|---|
| `SERVER_PORT` | `8080` | Puerto del servidor |
| `SPRING_DATASOURCE_URL` | `jdbc:mysql://localhost:3306/db-shortify` | Conexión MySQL |
| `SPRING_DATASOURCE_USERNAME` | `root` | Usuario DB |
| `SPRING_DATASOURCE_PASSWORD` | `1234` | Contraseña DB |
| `SPRING_JPA_HIBERNATE_DDL_AUTO` | `update` | Estrategia DDL |
| `AI_SERVICE_URL` | `http://localhost:8000` | URL del ai-service |
| `AI_SERVICE_ENABLED` | `true` | Habilitar/deshabilitar análisis IA |

### application.properties adicionales

| Propiedad | Valor | Descripción |
|---|---|---|
| `spring.servlet.multipart.max-file-size` | `500MB` | Tamaño máximo de archivo |
| `spring.servlet.multipart.max-request-size` | `500MB` | Tamaño máximo de request |
| `ai.service.connect-timeout` | `5000` | Timeout de conexión (ms) |
| `ai.service.read-timeout` | `30000` | Timeout de lectura (ms) |

### CORS

Todas las rutas (`/**`) están habilitadas para cualquier origen (`*`) con métodos `GET`, `POST`, `PUT`, `DELETE`.

---

## 📖 Swagger UI

```
http://localhost:8080/swagger-ui/index.html
```

---

## 📡 Endpoints

Base URL: `http://localhost:8080`

### `POST /api/conversions/upload` — Subir video

Sube un video y crea un job de conversión asíncrono con análisis IA.

**Content-Type:** `multipart/form-data`

| Parámetro | Tipo | Requerido | Descripción |
|---|---|---|---|
| `file` | `MultipartFile` | ✅ | Archivo de video (máx. 500MB) |
| `startTime` | `String` | ❌ | Tiempo de inicio del corte (ej: `00:00:05`) |
| `endTime` | `String` | ❌ | Tiempo de fin del corte (ej: `00:01:30`) |

**Respuesta — `200 OK`:**

```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "inputUrl": "videos_subidos/1735000000000_mi_video.mp4",
  "outputUrl": "",
  "createdAt": "2026-02-23T00:50:00",
  "status": "PENDING",
  "cropX": null,
  "subjectFound": null,
  "aiConfidence": null
}
```

> El `status` avanza: `PENDING` → `ANALYZING` → `PROCESSING` → `COMPLETED`

---

### `GET /api/conversions/{id}` — Consultar estado

| Parámetro | Tipo | Requerido | Descripción |
|---|---|---|---|
| `id` | `String (UUID)` | ✅ | ID del job |

**Respuesta — `200 OK`:**

```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "outputUrl": "/out/1735000000000_mi_video_vertical.mp4",
  "status": "COMPLETED"
}
```

---

### `GET /out/{filename}` — Descargar video convertido

Retorna directamente el archivo de video procesado.

```
GET /out/1735000000000_mi_video_vertical.mp4
```

---

## 📊 Estados del Job (`JobStatus`)

```
PENDING ──▶ ANALYZING ──▶ PROCESSING ──▶ COMPLETED
                │              │
                ▼              ▼
             FAILED         FAILED
                              │
                              ▼
                           EXPIRED (auto-cleanup)
```

| Estado | Descripción |
|---|---|
| `PENDING` | Job creado, esperando procesamiento |
| `ANALYZING` | 🤖 El ai-service está analizando el video para detectar al sujeto |
| `PROCESSING` | 🎬 FFmpeg está convirtiendo el video con crop inteligente |
| `COMPLETED` | ✅ Video vertical listo. `outputUrl` contiene la ruta |
| `FAILED` | ❌ Error durante el análisis o la conversión |
| `EXPIRED` | 🧹 Job eliminado por el scheduler (> 30 min) |

---

## 🗃 Modelo de Datos

### Entidad `ConversionJob`

Tabla: `conversion_jobs`

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | `String (UUID)` | Identificador único (auto-generado) |
| `inputUrl` | `String` | Ruta del video original |
| `outputUrl` | `String` | Ruta del video convertido |
| `createdAt` | `LocalDateTime` | Fecha de creación |
| `status` | `JobStatus` | Estado actual del job |
| `detailStatus` | `String` | Mensaje de detalle del estado |
| `startTime` | `String` | Tiempo de inicio del corte (opcional) |
| `endTime` | `String` | Tiempo de fin del corte (opcional) |
| `cropX` | `Integer` | Posición X de referencia del crop (primer segmento IA) |
| `subjectFound` | `Boolean` | Si se detectó un sujeto en el video |
| `aiConfidence` | `Double` | Confianza de la detección (0.0 — 0.95) |
| `cropExpression` | `String (@Lob)` | Expresión FFmpeg dinámica para tracking |

---

## ❌ Manejo de Errores

Estructura estandarizada para todas las respuestas de error:

```json
{
  "timeStamp": "2026-02-23T00:50:00",
  "status": 400,
  "path": "/api/conversions/upload",
  "message": "Descripción del error"
}
```

| Código | Excepción | Causa |
|---|---|---|
| `400` | `EmptyFileException` | Archivo vacío o nulo |
| `404` | `ResourceNotFoundException` | Job ID no encontrado |
| `500` | `StorageException` | Error guardando el archivo |
| `500` | `Exception` | Error genérico no controlado |

---

## 🧹 Limpieza Automática

El `VideoCleanupScheduler` se ejecuta **cada 60 segundos** y elimina:

- ✅ Archivos de video (original + procesado) del disco
- ✅ Registro del job de la base de datos

**Condiciones:**
- El job fue creado hace más de **30 minutos**
- El job **no** está en estado `PROCESSING` ni `ANALYZING`

---

## 🏃 Ejecución Local (sin Docker)

### Prerrequisitos

- Java 25 (JDK)
- Maven
- MySQL 8 corriendo en `localhost:3306` con DB `db-shortify`
- FFmpeg instalado y en el PATH
- (Opcional) ai-service corriendo en `localhost:8000`

```bash
cd backend
./mvnw spring-boot:run
```

Si no tenés el ai-service corriendo, setear `AI_SERVICE_ENABLED=false`:

```bash
AI_SERVICE_ENABLED=false ./mvnw spring-boot:run
```
