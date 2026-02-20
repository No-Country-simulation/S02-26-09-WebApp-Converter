package com.nocountry.videoconverter.services;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import com.nocountry.videoconverter.exceptions.technical.StorageException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VideoStorageService {
   // como aun los videos no se almacenan en algun repo los guardo en esta carpeta local 
    private final String UPLOAD_DIR = "videos/";

    public String save(MultipartFile file){
        try {
            String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIR + filename);
            Files.createDirectories(filePath.getParent());
            Files.write(filePath, file.getBytes());
            return filePath.toString();
        } catch (IOException e) {
            throw new StorageException("Error al guardar el archivo.");
        }
    }

    public void delete(String pathStr) throws IOException {
        if (pathStr == null || pathStr.isBlank()) return;

        // La ruta /out/ es solo para la web, la fisica en disco es videos_procesados/
        if (pathStr.startsWith("/out/")) {
            pathStr = pathStr.replace("/out/", "videos_procesados/");
        }

        Path path = Paths.get(pathStr);
        Files.deleteIfExists(path); // Si no existe, no hace nada y sigue. Si falla lanza IOException
    }
}