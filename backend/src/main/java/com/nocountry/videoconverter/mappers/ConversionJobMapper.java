package com.nocountry.videoconverter.mappers;

import com.nocountry.videoconverter.dto.ConversionJobDto;
import com.nocountry.videoconverter.entities.ConversionJob;
import org.springframework.stereotype.Component;

@Component
public class ConversionJobMapper {

    public ConversionJobDto toDto(ConversionJob conversionJob) {
        ConversionJobDto jobDto = new ConversionJobDto();
        jobDto.setId(conversionJob.getId());
        jobDto.setOutputUrl(conversionJob.getOutputUrl());
        jobDto.setStatus(conversionJob.getStatus());
        return jobDto;
    }
}
