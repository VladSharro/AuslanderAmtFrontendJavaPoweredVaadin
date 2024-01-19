package com.example.appforauslenderamt.controller;

import com.example.appforauslenderamt.controller.dto.*;
import com.example.appforauslenderamt.exceptions.InvalidDataException;
import com.example.appforauslenderamt.service.GenerateReportService;
import com.itextpdf.text.DocumentException;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleCustomException(InvalidDataException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ApiOperation(value = "Endpoint for getting user's data from passport picture",
            notes = "Takes passport image and returns information getting from it with using OCR")
    @PostMapping(value = "/get_data_from_passport", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.OK)
    @CrossOrigin
    public ResponseEntity<PassportDataResponseDto> getDataFromPassport(@RequestPart("passport_image") MultipartFile passportImage)
            throws IOException, InterruptedException {
        return new ResponseEntity<>(generateReportService.getDataFromPassport(passportImage), HttpStatus.OK);
    }

    @ApiOperation(value = "Endpoint for getting user's data from certificate of enrollment",
            notes = "Takes the image of the certificate of enrollment and returns information getting from it with using OCR")
    @PostMapping(value = "/get_data_from_certificate_of_enrollment", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.OK)
    @CrossOrigin
    public ResponseEntity<CertificateOfEnrollmentDataResponseDto> getDataFromCertificateOfEnrollment(@RequestPart("certificate_of_enrollment_image")
                                                                              MultipartFile certificateOfEnrollment)
            throws IOException, InterruptedException {
        return new ResponseEntity<>(generateReportService.getDataFromCertificateOfEnrollment(certificateOfEnrollment), HttpStatus.OK);
    }

    @ApiOperation(value = "Endpoint for getting user's data from health insurance certificate",
            notes = "Takes the image of the health insurance certificate and returns information getting from it with using OCR")
    @PostMapping(value = "/get_data_from_health_insurance_certificate", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.OK)
    @CrossOrigin
    public ResponseEntity<HealthInsuranceCertificateDataResponseDto> getDataFromHealthInsuranceCertificate(@RequestPart("health_insurance_certificate")
                                                                                             MultipartFile healthInsuranceCertificate)
            throws IOException, InterruptedException {
        return new ResponseEntity<>(generateReportService.getDataFromHealthInsuranceCertificate(healthInsuranceCertificate), HttpStatus.OK);
    }

    @ApiOperation(value = "Endpoint for getting financial data from financial document",
            notes = "Takes the image of financial document and returns information getting from it with using OCR")
    @PostMapping(value = "/get_data_from_financial_document", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.OK)
    @CrossOrigin
    public ResponseEntity<FinancialDocumentResponseDto> getDataFromFinancialDocument(@RequestPart("financial_document")
                                                                                 MultipartFile financialDocument)
            throws IOException, InterruptedException {
        return new ResponseEntity<>(generateReportService.getDataFromFinancialDocument(financialDocument), HttpStatus.OK);
    }

    @ApiOperation(value = "Endpoint for generation user's application form for Auslenderamt",
            notes = "Takes user data and passport image, compares entered data with passport and if matches " +
                    "generate application form")
    @PostMapping(value = "/generate_application_form", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @CrossOrigin
    public ResponseEntity<byte[]> generateApplicationForm(@RequestPart(name = "documents", required = false)
                                                                      MultipartFile[] documents,
                                                          @RequestPart(name = "signature_image", required = false)
                                                                  MultipartFile signatureImage,
                                                          @RequestPart(name = "user_data", required = false)
                                                                      UserDataRequestDto userData)
            throws IOException, ScriptException, InterruptedException, DocumentException,
            com.lowagie.text.DocumentException {

        byte[] pdfContent = generateReportService.generatePdfFromHtml(userData, documents, signatureImage);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "application_form.pdf");

        return new ResponseEntity<>(pdfContent, headers, HttpStatus.OK);
    }

    @ApiOperation(value = "Endpoint for sending user's application form to Auslenderamt",
            notes = "Takes user's application form and sends it to Auslenderamt")
    @PostMapping(value = "/send_email", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @CrossOrigin
    public ResponseEntity<Void> generateApplicationForm(@RequestPart("document") MultipartFile document,
                                                        @RequestPart(name = "user_email_address", required = false)
                                                                String userEmailAddress) {
        generateReportService.sendEmail(document, userEmailAddress);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
