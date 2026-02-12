package com.nocountry.videoconverter.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Objeto de Transferencia de Datos (DTO) que estandariza la estructura de las respuestas de error de la API.
 * <p>
 * Este objeto se devuelve al cliente siempre que ocurre una excepción controlada o no controlada,
 * proporcionando detalles sobre qué salió mal, dónde y cuándo.
 * </p>
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorDto {
    private LocalDateTime timeStamp;
    private int status;
    private String path;
    private String message;
}
