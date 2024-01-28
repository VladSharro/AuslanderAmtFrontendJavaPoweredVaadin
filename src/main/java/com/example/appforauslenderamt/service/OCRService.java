package com.example.appforauslenderamt.service;

import com.example.appforauslenderamt.config.OCRConfig;
import com.example.appforauslenderamt.controller.dto.CertificateOfEnrollmentDataResponseDto;
import com.example.appforauslenderamt.controller.dto.FinancialDocumentResponseDto;
import com.example.appforauslenderamt.controller.dto.HealthInsuranceCertificateDataResponseDto;
import com.example.appforauslenderamt.controller.dto.PassportDataResponseDto;
import com.example.appforauslenderamt.exceptions.InvalidDataException;
import lombok.extern.log4j.Log4j;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.stream.Collectors;

@Service
@Log4j
public class OCRService {

    private final OCRConfig ocrConfig;

    private static final Logger logger = LogManager.getLogger(GenerateReportService.class);

    @Autowired
    public OCRService(OCRConfig ocrConfig) {
        this.ocrConfig = ocrConfig;
    }

    public PassportDataResponseDto getDataFromPassport(MultipartFile passportImage)
            throws IOException, InterruptedException {
        logger.info("Attempt to process passport image {} with OCR", passportImage);
        String line = processWithOCR(passportImage, ocrConfig.getPassportAnalysisFilePath());
        // Process line of the output here
        JSONObject userData = new JSONObject(line);

        return PassportDataResponseDto.builder()
                .familyName(userData.getString("name"))
                .firstName(userData.getString("surname"))
                .nationality(userData.getString("nationality"))
                .dateOfBirth(userData.getString("date_of_birth"))
                .sex(userData.getString("sex"))
                .startDate(userData.getString("start_date"))
                .issueDate(userData.getString("issue_date"))
                .build();

    }

    public CertificateOfEnrollmentDataResponseDto getDataFromCertificateOfEnrollment(
            MultipartFile certificateOfEnrollment)
            throws IOException, InterruptedException {
        logger.info("Attempt to process certificate of enrollment {} with OCR", certificateOfEnrollment);
        String line = processWithOCR(certificateOfEnrollment, ocrConfig.getCertificateOfEnrollmentAnalysisFilePath());
        // Process line of the output here
        JSONObject userData = new JSONObject(line);

        CertificateOfEnrollmentDataResponseDto responseDto = CertificateOfEnrollmentDataResponseDto.builder()
                .firstName(userData.getString("name"))
                .familyName(userData.getString("surname"))
                .dateOfBirth(userData.getString("date_birth"))
                .placeOfBirth(userData.getString("city"))
                .address(userData.getString("address"))
                .semesterEndsDate(userData.getString("semester_ends"))
                .build();

        if (LocalDate.parse(responseDto.getSemesterEndsDate(),
                DateTimeFormatter.ofPattern("dd.MM.yyyy")).isBefore(LocalDate.now())) {
            throw new InvalidDataException("The document was expired");
        }

        return responseDto;

    }

    public HealthInsuranceCertificateDataResponseDto getDataFromHealthInsuranceCertificate(
            MultipartFile healthInsuranceCertificateImage)
            throws IOException, InterruptedException {
        logger.info("Attempt to process health insurance image {} with OCR", healthInsuranceCertificateImage);
        String line = processWithOCR(healthInsuranceCertificateImage,
                ocrConfig.getHealthInsuranceCertificateAnalysisFilePath());
        // Process line of the output here
        JSONObject userData = new JSONObject(line);

        return HealthInsuranceCertificateDataResponseDto.builder()
                .firstName(userData.getString("name"))
                .familyName(userData.getString("surname"))
                .insurer(userData.getString("krankenkasse"))
                .dateOfStart(userData.getString("date"))
                .build();

    }

    public FinancialDocumentResponseDto getDataFromWorkingContract(MultipartFile workingContract)
            throws IOException, InterruptedException {
        logger.info("Attempt to process working contract {} with OCR", workingContract);
        String line = processWithOCR(workingContract, ocrConfig.getWorkingContractAnalysisFilePath());
        // Process line of the output here
        JSONObject userData = new JSONObject(line);

        return FinancialDocumentResponseDto.builder()
                .sum(userData.getDouble("money"))
                .date(String.valueOf(userData.getString("date")))  // Convert the double to String
                .build();
    }

    public FinancialDocumentResponseDto getDataFromBlockedAccount(MultipartFile blockedAccount)
            throws IOException, InterruptedException {
        logger.info("Attempt to process blocked account {} with OCR", blockedAccount);
        String line = processWithOCR(blockedAccount, ocrConfig.getBlockedAccountAnalysisFilePath());
        // Process line of the output here
        JSONObject userData = new JSONObject(line);

        return FinancialDocumentResponseDto.builder()
                .sum(userData.getDouble("money"))
                .date(String.valueOf(userData.getString("date")))  // Convert the double to String
                .build();
    }


    private String processWithOCR(MultipartFile file, String pathToFile) throws IOException, InterruptedException {
        byte[] imageBytes = file.getBytes();

        // Encode the image data in Base64
        String encodedImage = Base64.getEncoder().encodeToString(imageBytes);

        // Write the encoded image data to a temporary file
        File tempFile = File.createTempFile("encoded_image", ".txt");
        try (FileWriter writer = new FileWriter(tempFile)) {
            writer.write(encodedImage);
        }

        ProcessBuilder processBuilder = new ProcessBuilder("python3", pathToFile, tempFile.getAbsolutePath());
        processBuilder.redirectErrorStream(true);

        logger.info("Run OCR file with parameters {}", pathToFile);

        Process process = processBuilder.start();
        process.waitFor();

        InputStream inputStream = process.getInputStream();
        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
        String line = reader.readLine();

        if (line.startsWith("Traceback")) {
            throw new InvalidDataException("Image processing with OCR was failed with exception: " +
                    String.join("\n", reader.lines().collect(Collectors.toSet())));
        }

        // Delete the temporary file
        tempFile.delete();

        return line;
    }

}

