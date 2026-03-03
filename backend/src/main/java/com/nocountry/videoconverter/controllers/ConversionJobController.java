package com.nocountry.videoconverter.controllers;

import com.nocountry.videoconverter.dto.ConversionJobDto;
import com.nocountry.videoconverter.entities.ConversionJob;
import com.nocountry.videoconverter.mappers.ConversionJobMapper;
import com.nocountry.videoconverter.services.ConversionJobService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/conversions")
public class ConversionJobController {

    private final ConversionJobService conversionJobService;
    private final ConversionJobMapper conversionJobMapper;

    private static final Logger logger = LoggerFactory.getLogger(ConversionJobController.class);

    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadVideo(@RequestParam("file") MultipartFile file,
                                         @RequestParam(required = false) String startTime,
                                         @RequestParam(required = false) String endTime) {

        logger.info("Solicitud recibida para subir video: {}", file.getOriginalFilename());

        if (startTime != null || endTime != null) {
            logger.info("Segmento solicitado - startTime: {}, endTime: {}", startTime, endTime);
        }

        try {
            ConversionJob video = conversionJobService.createJob(file, startTime, endTime);

            logger.info("Job creado exitosamente con ID: {}", video.getId());

            return ResponseEntity.ok(video);

        } catch (Exception e) {
            logger.error("Error al crear job de conversión para archivo: {}",
                    file.getOriginalFilename(), e);
            throw e; // dejamos que el handler global lo maneje
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ConversionJobDto> getStatus(@PathVariable String id) {

        logger.info("Consulta de estado para job ID: {}", id);

        try {
            ConversionJob job = conversionJobService.getJob(id);

            logger.debug("Estado actual del job {}: {}", id, job.getStatus());
            ConversionJobDto jobDto = conversionJobMapper.toDto(job);
            return ResponseEntity.ok(jobDto);

        } catch (Exception e) {
            logger.error("Error consultando estado del job ID: {}", id, e);
            throw e;
        }
    }
}