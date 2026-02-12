package com.nocountry.videoconverter.exceptions.technical;

public class FFmpegProcessFailed extends RuntimeException {
    public FFmpegProcessFailed(String message) {
        super(message);
    }
}
