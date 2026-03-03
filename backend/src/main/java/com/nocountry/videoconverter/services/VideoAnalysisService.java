package com.nocountry.videoconverter.services;

import com.nocountry.videoconverter.entities.ConversionJob;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

/**
 * Servicio que se comunica con el microservicio de IA (ai-service)
 * para obtener posiciones de recorte dinámicas (tracking del sujeto).
 * <p>
 * Llama a {@code POST /analyze-segments} para obtener una lista de
 * {@code {time, crop_x}} y construye una expresión FFmpeg que
 * interpola linealmente entre posiciones, logrando que el crop
 * siga al sujeto a lo largo del video.
 * </p>
 * <p>
 * Si el ai-service no está habilitado o no responde, se hace un fallback
 * silencioso: el video se recortará centrado.
 * </p>
 */
@Service
public class VideoAnalysisService {

    private static final Logger logger = LoggerFactory.getLogger(VideoAnalysisService.class);

    private final RestClient aiRestClient;
    private final boolean aiEnabled;

    public VideoAnalysisService(
            @Qualifier("aiRestClient") RestClient aiRestClient,
            @Value("${ai.service.enabled}") boolean aiEnabled
    ) {
        this.aiRestClient = aiRestClient;
        this.aiEnabled = aiEnabled;
        logger.info("VideoAnalysisService inicializado. AI habilitada: {}", aiEnabled);
    }

    /**
     * Analiza el video para obtener posiciones de recorte dinámicas.
     * Actualiza cropExpression, subjectFound y aiConfidence del job.
     *
     * @param job        El job de conversión
     * @param sharedPath Ruta del video accesible desde el ai-service
     */
    public void analyze(ConversionJob job, String sharedPath) {
        if (!aiEnabled) {
            logger.info("AI service deshabilitado. Usando crop centrado para job {}", job.getId());
            setFallbackValues(job);
            return;
        }

        try {
            logger.info("Enviando video a ai-service para análisis dinámico. Job: {}, path: {}",
                    job.getId(), sharedPath);

            // Llamada al endpoint POST /analyze-segments del ai-service
            @SuppressWarnings("unchecked")
            Map<String, Object> response = aiRestClient.post()
                    .uri("/analyze-segments")
                    .body(Map.of("video_path", sharedPath, "segment_duration", 2.0))
                    .retrieve()
                    .body(Map.class);

            if (response == null) {
                logger.warn("Respuesta nula del ai-service para job {}. Fallback.", job.getId());
                setFallbackValues(job);
                return;
            }

            Boolean subjectFound = (Boolean) response.get("subject_found");
            job.setSubjectFound(subjectFound);

            @SuppressWarnings("unchecked")
            List<Map<String, Object>> segments = (List<Map<String, Object>>) response.get("segments");

            if (segments == null || segments.isEmpty()) {
                logger.warn("Sin segmentos en la respuesta para job {}. Fallback.", job.getId());
                setFallbackValues(job);
                return;
            }

            // Construir la expresión FFmpeg dinámica
            String expression = buildCropExpression(segments);
            job.setCropExpression(expression);
            job.setAiConfidence(Boolean.TRUE.equals(subjectFound) ? 0.8 : 0.0);

            // Guardar el primer crop_x como referencia
            Number firstCropX = (Number) segments.get(0).get("crop_x");
            job.setCropX(firstCropX != null ? firstCropX.intValue() : null);

            logger.info("Análisis dinámico completado para job {}. {} segmentos, expression length={}",
                    job.getId(), segments.size(), expression.length());

        } catch (Exception e) {
            logger.warn("Error al comunicarse con ai-service para job {}. Fallback. Error: {}",
                    job.getId(), e.getMessage());
            setFallbackValues(job);
        }
    }

    /**
     * Construye una expresión FFmpeg para el parámetro X del filtro crop.
     * Usa interpolación lineal entre segmentos con if(between(t,...)).
     * <p>
     * Ejemplo para 3 segmentos:
     * {@code if(between(t,0,2),100+(150-100)*(t-0)/2, if(between(t,2,4),150+(200-150)*(t-2)/2, 200))}
     * </p>
     */
    private String buildCropExpression(List<Map<String, Object>> segments) {
        if (segments.size() == 1) {
            // Solo un segmento: crop_x fijo
            Number cropX = (Number) segments.get(0).get("crop_x");
            return String.valueOf(cropX.intValue());
        }

        StringBuilder expr = new StringBuilder();

        for (int i = 0; i < segments.size() - 1; i++) {
            double t0 = ((Number) segments.get(i).get("time")).doubleValue();
            int cx0 = ((Number) segments.get(i).get("crop_x")).intValue();
            double t1 = ((Number) segments.get(i + 1).get("time")).doubleValue();
            int cx1 = ((Number) segments.get(i + 1).get("crop_x")).intValue();

            // if(between(t, t0, t1), cx0 + (cx1 - cx0) * (t - t0) / (t1 - t0), ...
            expr.append("if(between(t\\,");
            expr.append(formatDouble(t0));
            expr.append("\\,");
            expr.append(formatDouble(t1));
            expr.append(")\\,");

            if (cx0 == cx1) {
                // No movement in this segment
                expr.append(cx0);
            } else {
                // Linear interpolation
                expr.append(cx0);
                expr.append("+");
                expr.append("(").append(cx1 - cx0).append(")");
                expr.append("*(t-").append(formatDouble(t0)).append(")");
                expr.append("/").append(formatDouble(t1 - t0));
            }

            expr.append("\\,");
        }

        // Last segment: hold the final crop_x
        int lastCropX = ((Number) segments.get(segments.size() - 1).get("crop_x")).intValue();
        expr.append(lastCropX);

        // Close all parentheses
        for (int i = 0; i < segments.size() - 1; i++) {
            expr.append(")");
        }

        return expr.toString();
    }

    private String formatDouble(double val) {
        if (val == Math.floor(val)) {
            return String.valueOf((int) val);
        }
        return String.format("%.2f", val);
    }

    private void setFallbackValues(ConversionJob job) {
        job.setCropX(null);
        job.setCropExpression(null);
        job.setSubjectFound(false);
        job.setAiConfidence(0.0);
    }
}
