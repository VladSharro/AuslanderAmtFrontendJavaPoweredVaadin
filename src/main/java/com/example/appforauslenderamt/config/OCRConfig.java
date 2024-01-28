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


    //private String passportAnalysisFilePath = "OCR/PassportAnalitics.py";
    //private String certificateOfEnrollmentAnalysisFilePath = "OCR/ImmatriculationAnalitics.py";
    //private String healthInsuranceCertificateAnalysisFilePath = "OCR/Health_Analitics.py";
    //private String workingContractAnalysisFilePath = "OCR/WorkContract.py";
    //private String blockedAccountAnalysisFilePath = "OCR/Geld.py";


    private String passportAnalysisFilePath;
    private String certificateOfEnrollmentAnalysisFilePath;
    private String healthInsuranceCertificateAnalysisFilePath;
    private String workingContractAnalysisFilePath;
    private String blockedAccountAnalysisFilePath;

}

