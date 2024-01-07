package com.example.appforauslenderamt.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "ocr")
public class OCRConfig {

    private String passportAnalysisFilePath;
    private String certificateOfEnrollmentAnalysisFilePath;
    private String healthInsuranceCertificateAnalysisFilePath;
    private String financialDocumentAnalysisFilePath;

}

