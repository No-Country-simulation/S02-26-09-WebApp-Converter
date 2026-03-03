# ==========================================
# 1. Etapa de Construcción (Builder)
# ==========================================
# Usamos una imagen con Maven y el JDK 25 para poder compilar
FROM maven:3.9-eclipse-temurin-25 AS builder

WORKDIR /build

# Copiamos el pom.xml y descargamos dependencias (optimiza el caché de Docker)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copiamos el código fuente del convertidor
COPY src ./src

# Hacemos el clean package ignorando los tests para agilizar el proceso
RUN mvn clean package -DskipTests

# ==========================================
# 2. Etapa de Ejecución (Runner)
# ==========================================
# Usamos una imagen base súper ligera
FROM eclipse-temurin:25-jre-alpine

WORKDIR /app

# Instalamos FFmpeg y verificamos que se instaló bien
RUN apk update && \
    apk add --no-cache ffmpeg && \
    ffmpeg -version

# Copiamos el .jar generado en la Etapa 1 a esta imagen final
COPY --from=builder /build/target/*.jar app.jar

# Creamos las carpetas que usa la app (relativas al WORKDIR /app)
RUN mkdir -p /app/videos /app/videos_procesados /app/videos_subidos

# Comando para arrancar la app
ENTRYPOINT ["java", "-jar", "app.jar"]