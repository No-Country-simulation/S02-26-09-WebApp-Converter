package com.nocountry.videoconverter.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * Representa una tarea de conversión de video dentro del sistema.
 * <p>
 * Esta entidad gestiona el ciclo de vida completo de la solicitud, desde la carga
 * inicial del video ({@code inputUrl}) hasta la generación del video vertical ({@code outputUrl}).
 * Mapea a la tabla "conversion_jobs" en la base de datos.
 * </p>
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "conversion_jobs")
public class ConversionJob {

    /**
     * Identificador único del trabajo (UUID).
     * Se utiliza UUID para evitar la enumeración secuencial y proteger la privacidad de los recursos.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String inputUrl;

    private String outputUrl;

    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private JobStatus status;

    @PrePersist
    protected void onCreate(){
        this.outputUrl = "";
        this.createdAt = LocalDateTime.now();
        this.status = JobStatus.PENDING;
    }

}
