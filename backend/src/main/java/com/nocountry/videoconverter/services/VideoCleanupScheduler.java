package com.nocountry.videoconverter.services;

import com.nocountry.videoconverter.entities.ConversionJob;
import com.nocountry.videoconverter.entities.JobStatus;
import com.nocountry.videoconverter.repositories.ConversionJobRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class VideoCleanupScheduler {

    private final ConversionJobRepository conversionJobRepository;
    private final VideoStorageService videoStorageService;

    // Corre cada 60s (Se puede ajustar)
    @Scheduled(fixedDelay = 60_000)
    @Transactional
    public void deleteOldVideos() {
        LocalDateTime cutoff = LocalDateTime.now().minusMinutes(30);

        // Evita borrar jobs que estén procesándose (por seguridad)
        List<ConversionJob> oldJobs =
                conversionJobRepository.findByCreatedAtBeforeAndStatusNot(cutoff, JobStatus.PROCESSING);

        for (ConversionJob job : oldJobs) {
            videoStorageService.delete(job.getInputUrl());
            videoStorageService.delete(job.getOutputUrl());

            conversionJobRepository.delete(job);
        }
    }
}