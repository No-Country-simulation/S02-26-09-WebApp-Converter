package com.nocountry.videoconverter.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/videos")
public class VideoController {

    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    public ResponseEntity<String> uploadVideo(@RequestParam("file") MultipartFile file) {

        if (file == null || file.isEmpty()) {
            return ResponseEntity.badRequest().body("No se recibió ningún archivo");
        }

        return ResponseEntity.ok(
                "Recibido: " + file.getOriginalFilename() +
                        " | size=" + file.getSize() +
                        " bytes | type=" + file.getContentType()
        );
    }
}
