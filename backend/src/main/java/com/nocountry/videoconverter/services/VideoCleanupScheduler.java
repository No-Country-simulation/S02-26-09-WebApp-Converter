package com.nocountry.videoconverter.services;

import com.nocountry.videoconverter.entities.ConversionJob;
import com.nocountry.videoconverter.entities.JobStatus;
import com.nocountry.videoconverter.repositories.ConversionJobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class VideoCleanupScheduler {

    private final ConversionJobRepository conversionJobRepository;
    private final VideoStorageService videoStorageService;

    // Corre cada 60s (Se puede ajustar)
    @Scheduled(fixedDelay = 60_000)
    public void deleteOldVideos() {
        LocalDateTime cutoff = LocalDateTime.now().minusMinutes(30);

        // Evita borrar jobs que estén procesándose (por seguridad)
        List<ConversionJob> oldJobs =
                conversionJobRepository.findByCreatedAtBeforeAndStatusNot(cutoff, JobStatus.PROCESSING);

        for (ConversionJob job : oldJobs) {
            try {
                videoStorageService.delete(job.getInputUrl());
                videoStorageService.delete(job.getOutputUrl());
                conversionJobRepository.delete(job);

            } catch (IOException e) {
                //Si ocurre un error caemos acá, no borramos de la db para reintentar en 60s
                System.err.println("Error eliminando archivos del job: " + job.getId() + ". Error: " + e.getMessage());
            }
            catch (Exception e) {
                // Captura genérica por si falla algo en la DB, para que no pare el bucle
                System.err.println("Error inesperado en job: " + job.getId() + ": " + e.getMessage());
            }
        }
    }
}