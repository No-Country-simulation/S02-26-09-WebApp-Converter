package com.nocountry.videoconverter.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;

@Configuration
@EnableAsync
public class AsyncCutterConfig {

    @Bean("asyncCutterExecutor")
    public Executor asyncTaskExecutor(){
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(2);
        executor.setQueueCapacity(100);
        executor.setMaxPoolSize(2);
        executor.setThreadNamePrefix("AsyncCutterThread-");
        executor.initialize();;

        return executor;
    }
}
