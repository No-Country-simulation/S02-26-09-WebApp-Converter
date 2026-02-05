package com.nocountry.videoconverter.entities;

/**
 * Inicializa los valores por defecto antes de persistir la entidad en la base de datos.
 * <ul>
 * <li>Estado inicial: PENDING</li>
 * <li>Fecha de creación: Ahora</li>
 * <li>OutputUrl: Cadena vacía (para evitar nulos)</li>
 * </ul>
 */
public enum JobStatus {

    PENDING("PENDING"),
    PROCESSING("PROCESSING"),
    COMPLETED("COMPLETED"),
    FAILED("FAILED"),
    EXPIRED("EXPIRED");

    private String description;

    JobStatus(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

}
