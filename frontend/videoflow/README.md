**Descripción**

Aplicación frontend del proyecto VideoConverter. Está construida con Next.js y TypeScript (estructura app router) y sirve como interfaz para subir videos, editar cortes y descargar resultados procesados por el backend.

**Estructura principal**

- **frontend/videoflow**: raíz del frontend.
    - [frontend/videoflow/app/page.tsx](frontend/videoflow/app/page.tsx) - entrada principal de la app.
    - [frontend/videoflow/app/upload-file/page.tsx](frontend/videoflow/app/upload-file/page.tsx) - página de subida.
    - [frontend/videoflow/app/Download/page.tsx](frontend/videoflow/app/Download/page.tsx) - página de descargas.
    - [frontend/videoflow/app/components](frontend/videoflow/app/components) - componentes UI reutilizables (VideoEditor, UploadCard, MediaControls, etc.).
    - [frontend/videoflow/app/services/video.service.ts](frontend/videoflow/app/services/video.service.ts) - cliente HTTP hacia el backend.
    - [frontend/videoflow/package.json](frontend/videoflow/package.json) - scripts y dependencias.
    - [frontend/videoflow/Dockerfile](frontend/videoflow/Dockerfile) - imagen Docker para el frontend.

**Dependencias y scripts**

Ver [frontend/videoflow/package.json](frontend/videoflow/package.json) para la lista completa. Los scripts principales son:

```bash
pnpm run dev    # arranca servidor de desarrollo (puede usarse npm o yarn)
pnpm build  # compila la app para producción
pnpm start  # arranca la versión compilada
pnpm lint   # ejecuta eslint
pnpm format # formatea con prettier
```

Se recomienda usar `pnpm` (hay `pnpm-lock.yaml`) pero `npm`/`yarn` también funcionan.

**Ejecución local**

1. Instalar dependencias:

```bash
pnpm install
```

2. Ejecutar en modo desarrollo:

```bash
# ir frontend/videoflow/
pnpm run dev
# abre http://localhost:3000
```

3. Construir y arrancar producción:

```bash
pnpm build
pnpm start
```

**Componentes y flujos principales**

- **UploadCard / upload-file**: formulario para seleccionar y subir un video. Llama a `uploadVideo(file)` en [app/services/video.service.ts](frontend/videoflow/app/services/video.service.ts).
- **VideoEditor**: vista para previsualizar y cortar el video antes de generar el resultado.
- **MediaControls**: controles reproducir/pausa/ir a frame.
- **GeneratedVideo / Download**: muestra el video procesado y permite descargarlo.

Se puede revisar los componentes en [frontend/videoflow/app/components] para detalles de implementación.

**Integración con backend**

El frontend espera que el backend exponga endpoints REST en `/api/conversions`:

- `POST /api/conversions/upload` para subir videos (form-data con campo `file`).
- `GET /api/conversions/{id}` para consultar estado y obtener resultado.

Estos endpoints están codificados actualmente en [frontend/videoflow/app/services/video.service.ts](frontend/videoflow/app/services/video.service.ts). Adapta la URL si tu backend corre en otra dirección.

**Docker**

Para construir y ejecutar la imagen del frontend (usa el Dockerfile en la carpeta):

```bash
docker build -t videoflow-frontend -f frontend/videoflow/Dockerfile .
docker run -p 3000:3000 --env NEXT_PUBLIC_API_URL=http://backend:8080 videoflow-frontend
```

En un entorno con `docker-compose`, asegura que el servicio del backend tenga el nombre y puerto esperados (por ejemplo `backend:8080`).

**Testing, lint y formateo**

- Ejecutar lint: `pnpm lint` (usa `eslint`).
- Formatear: `pnpm format` (usa `prettier` y plugin de Tailwind).


