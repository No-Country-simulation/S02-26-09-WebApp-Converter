package com.nocountry.videoconverter.services;

import com.nocountry.videoconverter.entities.ConversionJob;
import com.nocountry.videoconverter.entities.JobStatus;
import com.nocountry.videoconverter.repositories.ConversionJobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class VideoCutterService {

    private final ConversionJobRepository conversionJobRepository;

    @Async("asyncCutterExecutor")
    public CompletableFuture<ConversionJob> cut(ConversionJob conversionJob) {

        conversionJob.setStatus(JobStatus.PROCESSING);
        conversionJobRepository.save(conversionJob);

        try {
            String inputPath = conversionJob.getInputUrl();

            File inputFile = new File(inputPath);

            //los videos procesados se guardaran acà
            String outputDir = "videos_procesados/";
            new File(outputDir).mkdirs();

            String outputName = inputFile.getName().replace(".mp4", "_vertical.mp4");
            String outputPath = outputDir + outputName;

            //ProcessBuilder es la hoja de comandos para hablar con el sistema operativo ffmpeg es un programa (despues se configura en el railway o docker para que lo tenga)
            ProcessBuilder pb = new ProcessBuilder(
                    "ffmpeg", "-i", inputPath, //para detectar el video a procesar
                    "-vf", "crop=ih*9/16:ih", //videoFilter osea vamos a transformar el video // crop es la orden del corte , ih = (input height/ altura del input/original) ih*9/16: Calcula el ancho para que la proporción sea 9:16 (vertical). (por ahora toma por defecto el centro despues hay que ver como implementar para que el usuario elija que parte exactamnete desea recortar X e Y)
                    "-y", //que lo haga YES
                    outputPath //donde se guardarà
            );

            pb.inheritIO();

            Process process = pb.start(); //aca se ejecuta el comando
            int exitCode = process.waitFor(); //se espera hasta que acabe
            //0 = bien
            if (exitCode == 0) {
                conversionJob.setOutputUrl("/out/" + outputName);
                conversionJob.setStatus(JobStatus.COMPLETED);
                System.out.println("Conversión exitosa: " + outputPath);
            } else {
                conversionJob.setStatus(JobStatus.FAILED);
                System.err.println("FFmpeg falló con código: " + exitCode);
            }

        } catch (IOException | InterruptedException e) {

            conversionJob.setStatus(JobStatus.FAILED);
            System.err.println("Error procesando el video: " + conversionJob.getId() + " - " + e.getMessage());

        } finally {
            conversionJobRepository.save(conversionJob);
        }

        return CompletableFuture.completedFuture(conversionJob);
    }
}
