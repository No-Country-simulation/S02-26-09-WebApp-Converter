package com.nocountry.videoconverter.services;

import com.nocountry.videoconverter.entities.ConversionJob;
import com.nocountry.videoconverter.entities.JobStatus;
import com.nocountry.videoconverter.exceptions.business.EmptyFileException;
import com.nocountry.videoconverter.exceptions.business.ResourceNotFoundException;
import com.nocountry.videoconverter.repositories.ConversionJobRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


@Service
@RequiredArgsConstructor
public class ConversionJobService {

    private static final Logger logger = LoggerFactory.getLogger(ConversionJobService.class);

    private final VideoStorageService storageService;
    private final ConversionJobRepository repository;
    private final VideoCutterService videoCutterService;
    private final VideoAnalysisService videoAnalysisService;

    public ConversionJob createJob(MultipartFile file, String startTime, String endTime) {
        logger.info("Iniciando creación de nuevo job de conversión");

        if (file == null || file.isEmpty()) {
            logger.warn("Intento de creación de job con archivo vacío o nulo");
            throw new EmptyFileException("No se recibió ningún archivo.");
        }

        try {
            logger.debug("Guardando archivo en almacenamiento...");
            String path = storageService.save(file);

            ConversionJob job = new ConversionJob();
            job.setInputUrl(path);

            //Guardamos tiempos opcionales
            job.setStartTime(startTime);
            job.setEndTime(endTime);

            if (startTime != null || endTime != null) {
                logger.info("Segmento solicitado - startTime: {}, endTime: {}", startTime, endTime);
            }

            ConversionJob savedJob = repository.save(job);
            logger.info("Job creado con ID: {}", savedJob.getId());

            // --- Fase de análisis IA ---
            savedJob.setStatus(JobStatus.ANALYZING);
            savedJob.setDetailStatus("Analizando video con IA para determinar posición de recorte...");
            repository.save(savedJob);

            // La ruta del video dentro del contenedor ai-service es la misma
            // porque ambos comparten el volumen en /app/videos_subidos
            String sharedPath = "/app/" + path;
            videoAnalysisService.analyze(savedJob, sharedPath);
            repository.save(savedJob);

            logger.info("Análisis IA completado para job {}. cropX={}, subjectFound={}",
                    savedJob.getId(), savedJob.getCropX(), savedJob.getSubjectFound());

            // --- Fase de corte con FFmpeg ---
            logger.debug("Iniciando proceso de corte para job {}", savedJob.getId());
            videoCutterService.cut(savedJob);

            return savedJob;

        } catch (Exception e) {
            logger.error("Error creando job de conversión", e);
            throw e;
        }
    }

    public ConversionJob getJob(String id) {

        logger.info("Consultando job con ID: {}", id);

        return repository.findById(id)
                .orElseThrow(() -> {
                    logger.warn("Job no encontrado con ID: {}", id);
                    return new ResourceNotFoundException(
                            "No se encontró un archivo con el id: " + id + " ."
                    );
                });
    }
}