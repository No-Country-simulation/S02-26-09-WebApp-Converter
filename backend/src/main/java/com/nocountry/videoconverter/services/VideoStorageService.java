package com.nocountry.videoconverter.services;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VideoStorageService {
   // como aun los videos no se almacenan en algun repo los guardo en esta carpeta local 
    private final String UPLOAD_DIR = "videos/";

    public String save(MultipartFile file) throws IOException {
        String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(UPLOAD_DIR + filename);
        Files.createDirectories(filePath.getParent());
        Files.write(filePath, file.getBytes());
        return filePath.toString();
    }

    public boolean delete(String pathStr) {
        if (pathStr == null || pathStr.isBlank()) return false;
        try {
            Path path = Paths.get(pathStr);
            return Files.deleteIfExists(path);
        } catch (IOException ex) {
            // evitar lanzar excepción desde el scheduler; se puede loggear aquí
            System.err.println("Error eliminando archivo: " + pathStr + " -> " + ex.getMessage());
            return false;
        }
    }
}