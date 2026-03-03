package com.nocountry.videoconverter.dto;

import com.nocountry.videoconverter.entities.JobStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConversionJobDto {
    private String id;
    private String outputUrl;
    private JobStatus status;
}
