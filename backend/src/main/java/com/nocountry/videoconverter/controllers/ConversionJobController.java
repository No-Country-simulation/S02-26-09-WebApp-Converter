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
    public ResponseEntity<?> uploadVideo(@RequestParam("file") MultipartFile file) {
        ConversionJob video = conversionJobService.createJob(file);
        return ResponseEntity.ok(video);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ConversionJob> getStatus(@PathVariable String id) {
        ConversionJob job = conversionJobService.getJob(id);
        return ResponseEntity.ok(job);
    }

}
