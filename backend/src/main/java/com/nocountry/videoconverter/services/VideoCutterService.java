package com.nocountry.videoconverter.services;

import com.nocountry.videoconverter.entities.ConversionJob;
import com.nocountry.videoconverter.entities.JobStatus;
import com.nocountry.videoconverter.repositories.ConversionJobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class VideoCutterService {

    private final ConversionJobRepository conversionJobRepository;

    @Async("asyncCutterExecutor")
    public CompletableFuture<ConversionJob> cut(ConversionJob conversionJob) throws InterruptedException{

        conversionJob.setStatus(JobStatus.PROCESSING);
        conversionJobRepository.save(conversionJob);

        // Simulación de demora de 10 segundos - Aca se corta el video con FFpmeg
        Thread.sleep(10000L);
        //Si sale mal lanzamos exception, cambiamos el status conversionJob.setStatus(JobStatus.FAILED) y actualiza db

        //Si sale bien, cambiamos Status, guardamos en dB y devolvemos el job terminado
        conversionJob.setStatus(JobStatus.COMPLETED);
        conversionJobRepository.save(conversionJob);
        return CompletableFuture.completedFuture(conversionJob);
    }
}
