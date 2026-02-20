# 1. Usamos la imagen base
FROM eclipse-temurin:25-jre-alpine

# 2. Instalamos FFmpeg dentro del contenedor
RUN apk update && apk add --no-cache ffmpeg

# 3. Verificamos que se instaló bien
RUN ffmpeg -version

# 4. Copiamos el .jar compilado al contenedor
COPY target/*.jar app.jar

# 5. Creamos las carpetas que usa la app
RUN mkdir -p /videos /videos_procesados

# 6. Comando para arrancar la app
ENTRYPOINT ["java", "-jar", "/app.jar"]