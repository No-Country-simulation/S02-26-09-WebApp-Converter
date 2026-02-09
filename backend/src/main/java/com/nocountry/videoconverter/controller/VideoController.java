package com.nocountry.videoconverter.controller;

import com.nocountry.videoconverter.entities.ConversionJob;
import com.nocountry.videoconverter.services.VideoJobService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/videos")
public class VideoController {

    private final VideoJobService videoJobService;

    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadVideo(@RequestParam("file") MultipartFile file) throws Exception {

        if (file == null || file.isEmpty()) {
            return ResponseEntity.badRequest().body("No se recibió ningún archivo");
        }

        ConversionJob video = videoJobService.createJob(file);

        return ResponseEntity.ok(video);
    }
}
