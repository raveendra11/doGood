package com.dogood.exception;

import lombok.Getter;

@Getter
public class ErrorResponse {
    private final String path;
    private final int status;
    private final String message;

    public ErrorResponse(String path, int status, String message) {
        this.path = path;
        this.status = status;
        this.message = message;
    }

}