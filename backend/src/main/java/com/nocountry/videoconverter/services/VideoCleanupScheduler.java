package com.nocountry.videoconverter.services;

import com.nocountry.videoconverter.entities.ConversionJob;
import com.nocountry.videoconverter.entities.JobStatus;
import com.nocountry.videoconverter.repositories.ConversionJobRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class VideoCleanupScheduler {

    private static final Logger logger = LoggerFactory.getLogger(VideoCleanupScheduler.class);

    private final ConversionJobRepository conversionJobRepository;
    private final VideoStorageService videoStorageService;

    // Corre cada 60s
    @Scheduled(fixedDelay = 60_000)
    public void deleteOldVideos() {

        logger.info("Ejecutando tarea programada de limpieza de videos");

        LocalDateTime cutoff = LocalDateTime.now().minusMinutes(30);

        // Evitamos borrar jobs PENDING, PROCESSING y EXPIRED
        List<JobStatus> excludedStatus = new ArrayList<>(Arrays.asList(
                JobStatus.PENDING,
                JobStatus.PROCESSING,
                JobStatus.EXPIRED
        ));

        List<ConversionJob> oldJobs =
                conversionJobRepository.findByCreatedAtBeforeAndStatusNotIn(cutoff, excludedStatus);

        logger.info("Se encontraron {} jobs para limpieza", oldJobs.size());

        for (ConversionJob job : oldJobs) {

            logger.debug("Procesando limpieza para job ID: {}", job.getId());

            try {
                videoStorageService.delete(job.getInputUrl());
                videoStorageService.delete(job.getOutputUrl());

                job.setStatus(JobStatus.EXPIRED);
                conversionJobRepository.save(job);

                logger.info("Job {} eliminado correctamente de disco y aplicada baja lógica", job.getId());

            } catch (IOException e) {

                logger.error("Error eliminando archivos del job {}", job.getId(), e);

            } catch (Exception e) {

                logger.error("Error inesperado durante limpieza del job {}", job.getId(), e);
            }
        }

        logger.debug("Finalizó ejecución del scheduler de limpieza");
    }
}