package com.nocountry.videoconverter.controllers;

import com.nocountry.videoconverter.entities.ConversionJob;
import com.nocountry.videoconverter.services.ConversionJobService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/conversions")
public class ConversionJobController {

    private final ConversionJobService conversionJobService;

    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadVideo(@RequestParam("file") MultipartFile file) throws Exception {

        if (file == null || file.isEmpty()) {
            return ResponseEntity.badRequest().body("No se recibió ningún archivo");
        }

        ConversionJob video = conversionJobService.createJob(file);

        return ResponseEntity.ok(video);
    }
}
