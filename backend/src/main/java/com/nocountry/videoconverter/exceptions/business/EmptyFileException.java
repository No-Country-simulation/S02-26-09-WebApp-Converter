package com.nocountry.videoconverter.exceptions.business;

public class EmptyFileException extends RuntimeException {
    public EmptyFileException(String message) {
        super(message);
    }
}
