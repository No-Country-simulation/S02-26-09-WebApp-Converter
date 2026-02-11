package com.nocountry.videoconverter.repositories;

import com.nocountry.videoconverter.entities.ConversionJob;
import com.nocountry.videoconverter.entities.JobStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

public interface ConversionJobRepository extends JpaRepository<ConversionJob, String> {
    List<ConversionJob> findByCreatedAtBefore(LocalDateTime cutoff);

    List<ConversionJob> findByCreatedAtBeforeAndStatusNot(LocalDateTime cutoff, JobStatus status);
}