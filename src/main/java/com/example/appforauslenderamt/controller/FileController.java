package com.example.appforauslenderamt.controller;

import com.example.appforauslenderamt.controller.dto.*;
import com.example.appforauslenderamt.service.GenerateReportService;
import com.lowagie.text.DocumentException;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.script.ScriptException;
import java.io.IOException;

@RestController
@RequestMapping
public class FileController {

    private final GenerateReportService generateReportService;

    @Autowired
    public FileController(GenerateReportService generateReportService) {
        this.generateReportService = generateReportService;
    }

    @ApiOperation(value = "Endpoint for getting user's data from passport picture",
            notes = "Takes passport image and returns information getting from it with using OCR")
    @PostMapping(value = "/get_data_from_passport", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public PassportDataResponseDto getDataFromPassport(@RequestPart("passport_image") MultipartFile passportImage)
            throws IOException, InterruptedException {
        return generateReportService.getDataFromPassport(passportImage);
    }

    @ApiOperation(value = "Endpoint for getting user's data from certificate of enrollment",
            notes = "Takes the image of the certificate of enrollment and returns information getting from it with using OCR")
    @PostMapping(value = "/get_data_from_certificate_of_enrollment", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public CertificateOfEnrollmentDataResponseDto getDataFromCertificateOfEnrollment(@RequestPart("certificate_of_enrollment_image")
                                                                              MultipartFile certificateOfEnrollment)
            throws IOException, InterruptedException {
        return generateReportService.getDataFromCertificateOfEnrollment(certificateOfEnrollment);
    }

    @ApiOperation(value = "Endpoint for getting user's data from health insurance certificate",
            notes = "Takes the image of the health insurance certificate and returns information getting from it with using OCR")
    @PostMapping(value = "/get_data_from_health_insurance_certificate", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public HealthInsuranceCertificateDataResponseDto getDataFromHealthInsuranceCertificate(@RequestPart("health_insurance_certificate")
                                                                                             MultipartFile healthInsuranceCertificate)
            throws IOException, InterruptedException {
        return generateReportService.getDataFromHealthInsuranceCertificate(healthInsuranceCertificate);
    }

    @ApiOperation(value = "Endpoint for getting financial data from financial document",
            notes = "Takes the image of financial document and returns information getting from it with using OCR")
    @PostMapping(value = "/get_data_from_financial_document", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public FinancialDocumentResponseDto getDataFromFinancialDocument(@RequestPart("financial_document")
                                                                                 MultipartFile financialDocument)
            throws IOException, InterruptedException {
        return generateReportService.getDataFromFinancialDocument(financialDocument);
    }

    @ApiOperation(value = "Endpoint for generation user's application form for Auslenderamt",
            notes = "Takes user data and passport image, compares entered data with passport and if matches " +
                    "generate application form")
    @PostMapping(value = "/generate_application_form", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void uploadFile(@RequestPart("passport_image") MultipartFile passportImage,
                           @RequestPart("user_data") UserDataRequestDto userData)
            throws IOException, ScriptException, InterruptedException, DocumentException {
        generateReportService.generatePdfFromHtml(userData, passportImage);
    }

//    @ApiOperation(value = "Endpoint for generation html template from pdf file",
//            notes = "Takes pdf file and converts in to pdf")
//    @PostMapping(value = "/convert_to_html", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    @ResponseStatus(HttpStatus.OK)
//    public void convertToHtml(@RequestPart("passport_image") MultipartFile passportImage)
//            throws IOException, ScriptException, InterruptedException, DocumentException {
//        generateReportService.generateH(userData, passportImage);
//    }

}
