package com.nocountry.videoconverter.entities;

/**
 * Descripción del estado de la conversión para optimizar la visualización.
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
