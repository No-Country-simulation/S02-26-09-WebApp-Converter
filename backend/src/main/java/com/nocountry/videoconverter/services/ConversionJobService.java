package com.nocountry.videoconverter.services;

import com.nocountry.videoconverter.entities.ConversionJob;
import com.nocountry.videoconverter.repositories.ConversionJobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ConversionJobService {

    private final VideoStorageService storageService;
    private final ConversionJobRepository repository;
    private final VideoCutterService videoCutterService;

    public ConversionJob createJob(MultipartFile file) throws Exception {

        String path = storageService.save(file);

        ConversionJob job = new ConversionJob();
        job.setInputUrl(path);
        ConversionJob savedJob = repository.save(job);

        videoCutterService.cut(savedJob);

        return savedJob;
    }
}
