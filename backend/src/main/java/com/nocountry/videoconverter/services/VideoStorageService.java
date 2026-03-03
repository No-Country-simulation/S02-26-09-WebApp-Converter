package com.nocountry.videoconverter.services;

import com.nocountry.videoconverter.exceptions.technical.StorageException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@RequiredArgsConstructor
public class VideoStorageService {

    private static final Logger logger = LoggerFactory.getLogger(VideoStorageService.class);

    // Los videos se guardan en el volumen compartido con el ai-service
    private final String UPLOAD_DIR = "videos_subidos/";

    public String save(MultipartFile file) {

        logger.info("Guardando archivo en almacenamiento local");

        try {
            String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIR + filename);

            Files.createDirectories(filePath.getParent());
            Files.write(filePath, file.getBytes());

            logger.info("Archivo guardado correctamente en ruta: {}", filePath);

            return filePath.toString().replace("\\", "/");

        } catch (IOException e) {

            logger.error("Error al guardar archivo en almacenamiento", e);

            throw new StorageException("Error al guardar el archivo.");
        }
    }

    public void delete(String pathStr) throws IOException {

        if (pathStr == null || pathStr.isBlank()) {
            logger.debug("Intento de eliminación con ruta nula o vacía");
            return;
        }

        logger.info("Eliminando archivo con ruta: {}", pathStr);

        // La ruta /out/ es solo para la web, la fisica en disco es videos_procesados/
        if (pathStr.startsWith("/out/")) {
            pathStr = pathStr.replace("/out/", "videos_procesados/");
        }

        Path path = Paths.get(pathStr);

        try {
            Files.deleteIfExists(path);
            logger.info("Archivo eliminado correctamente: {}", path);

        } catch (IOException e) {

            logger.error("Error eliminando archivo: {}", path, e);
            throw e;
        }
    }
}