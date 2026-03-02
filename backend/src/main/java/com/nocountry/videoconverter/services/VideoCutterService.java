package com.nocountry.videoconverter.services;

import com.nocountry.videoconverter.entities.ConversionJob;
import com.nocountry.videoconverter.entities.JobStatus;
import com.nocountry.videoconverter.repositories.ConversionJobRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.concurrent.CompletableFuture;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VideoCutterService {

    private static final Logger logger = LoggerFactory.getLogger(VideoCutterService.class);

    private final ConversionJobRepository conversionJobRepository;

    @Async("asyncCutterExecutor")
    public CompletableFuture<ConversionJob> cut(ConversionJob conversionJob) {

        logger.info("Iniciando conversión para job ID: {}", conversionJob.getId());

        // 🔹 Estado inicial: PROCESSING
        conversionJob.setStatus(JobStatus.PROCESSING);

        if (conversionJob.getStartTime() != null || conversionJob.getEndTime() != null) {
            conversionJob.setDetailStatus(
                    "Procesando segmento " +
                            (conversionJob.getStartTime() != null ? conversionJob.getStartTime() : "inicio") +
                            " - " +
                            (conversionJob.getEndTime() != null ? conversionJob.getEndTime() : "fin")
            );
        } else {
            conversionJob.setDetailStatus("Procesando conversión completa con FFmpeg");
        }

        conversionJobRepository.save(conversionJob);

        try {

            String inputPath = conversionJob.getInputUrl();
            File inputFile = new File(inputPath);

            // Carpeta donde se almacenan los videos convertidos
            String outputDir = "videos_procesados/";
            new File(outputDir).mkdirs();

            String outputName = inputFile.getName().replace(".mp4", "_vertical.mp4");
            String outputPath = outputDir + outputName;

            /*
             * ProcessBuilder permite ejecutar comandos del sistema operativo.
             *
             * En este caso se invoca FFmpeg para:
             *  - Opcionalmente recortar un segmento (-ss inicio, -to fin)
             *  - Tomar el archivo de entrada (-i)
             *  - Aplicar un filtro de recorte vertical (crop=ih*9/16:ih)
             *  - Forzar sobreescritura (-y)
             *  - Guardar el resultado en la ruta indicada
             *
             * El comando se construye dinámicamente dependiendo
             * de si el usuario envió startTime y/o endTime.
             */

            List<String> command = new ArrayList<>();
            command.add("ffmpeg");

            // 🔹 Input primero
            command.add("-i");
            command.add(inputPath);

            // 🔹 Agregamos tiempo de inicio si existe
            if (conversionJob.getStartTime() != null && !conversionJob.getStartTime().isBlank()) {
                command.add("-ss");
                command.add(conversionJob.getStartTime());
            }

            // 🔹 Agregamos tiempo de fin si existe
            if (conversionJob.getEndTime() != null && !conversionJob.getEndTime().isBlank()) {
                command.add("-to");
                command.add(conversionJob.getEndTime());
            }

            // 🔹 Filtro de recorte vertical (16:9 → 9:16)
            command.add("-vf");
            command.add("crop=ih*9/16:ih");

            // 🔹 Sobrescribir si ya existe
            command.add("-y");

            // 🔹 Archivo de salida
            command.add(outputPath);

            ProcessBuilder pb = new ProcessBuilder(command);

            logger.debug("Ejecutando comando FFmpeg para job {}: {}",
                    conversionJob.getId(), pb.command());

            pb.inheritIO();

            Process process = pb.start();
            int exitCode = process.waitFor();

            logger.debug("FFmpeg terminó con código {} para job {}",
                    exitCode, conversionJob.getId());

            // 🔹 Código 0 indica ejecución exitosa
            if (exitCode == 0) {

                conversionJob.setOutputUrl("/out/" + outputName);
                conversionJob.setStatus(JobStatus.COMPLETED);
                conversionJob.setDetailStatus("Conversión exitosa");

                logger.info("Conversión completada exitosamente para job {}. Output: {}",
                        conversionJob.getId(), outputPath);

            } else {

                conversionJob.setStatus(JobStatus.FAILED);
                conversionJob.setDetailStatus(
                        "Error durante el recorte con FFmpeg. Código: " + exitCode
                );

                logger.error("FFmpeg falló para job {} con código {}",
                        conversionJob.getId(), exitCode);
            }

        } catch (IOException | InterruptedException e) {
            // 🔹 Manejo de errores técnicos (ej: FFmpeg no instalado)
            conversionJob.setStatus(JobStatus.FAILED);
            conversionJob.setDetailStatus(
                    "Error interno durante la conversión: " + e.getMessage()
            );

            logger.error("Error procesando el video para job {}",
                    conversionJob.getId(), e);

            Thread.currentThread().interrupt();

        } finally {
            // 🔹 Siempre persistimos el estado final en la base de datos
            conversionJobRepository.save(conversionJob);

            logger.debug("Estado final del job {} guardado como {}",
                    conversionJob.getId(), conversionJob.getStatus());
        }

        return CompletableFuture.completedFuture(conversionJob);
    }
}