package com.example.appforauslenderamt.frotn.returnofthehope;

import com.example.appforauslenderamt.controller.dto.HealthInsuranceCertificateDataResponseDto;
import com.example.appforauslenderamt.service.OCRService;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.MemoryBuffer;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public class InsuranceClass extends VerticalLayout {

    private final OCRService ocrService;
    private final MemoryBuffer healthInsuranceCertificateBuffer = new MemoryBuffer();
    private final Upload healthInsuranceCertificateUpload = new Upload(healthInsuranceCertificateBuffer);
    private final TextField insurerCompanyName = new TextField("Company of insurance");
    private final Image insuranceImage = new Image();

    public InsuranceClass(OCRService ocrService) {
        this.ocrService = ocrService;

        setAlignItems(FlexComponent.Alignment.CENTER); // Center all components horizontally in this layout

        healthInsuranceCertificateUpload.setAcceptedFileTypes("application/pdf"); // Accept only PDF files
        healthInsuranceCertificateUpload.setMaxFiles(1); // Allow uploading only one file
        healthInsuranceCertificateUpload.addSucceededListener(event -> extractDataFromInsuranceDocument());

        createInsuranceLayout();
    }

    private void createInsuranceLayout() {
        Button submitButton = new Button("Submit");

        submitButton.addClickListener(event -> {
            // Handle form submission logic here
            // Example: String insurerName = insurerCompanyName.getValue();
        });

        add(
                healthInsuranceCertificateUpload,
                insuranceImage,
                insurerCompanyName,
                submitButton
        );
    }

    private void extractDataFromInsuranceDocument() {
        try {
            byte[] healthInsuranceCertificateBytes = healthInsuranceCertificateBuffer.getInputStream().readAllBytes();
            MultipartFile healthInsuranceCertificateMultipartFile = new MockMultipartFile(
                    "healthInsuranceCertificate", // name of the parameter
                    "health-insurance-certificate.pdf", // filename, you can set this to the actual file name
                    "application/pdf", // content type of the file
                    healthInsuranceCertificateBytes
            );

            HealthInsuranceCertificateDataResponseDto healthInsuranceCertificateDataResponseDto =
                    ocrService.getDataFromHealthInsuranceCertificate(healthInsuranceCertificateMultipartFile);

            if (healthInsuranceCertificateDataResponseDto != null) {
                insurerCompanyName.setValue(healthInsuranceCertificateDataResponseDto.getInsurer());
                removeAll();
                createInsuranceLayout();
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}





/*package com.example.appforauslenderamt.frotn.returnofthehope;

import com.example.appforauslenderamt.controller.dto.HealthInsuranceCertificateDataResponseDto;
import com.example.appforauslenderamt.service.OCRService;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.MemoryBuffer;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public class InsuranceClass extends VerticalLayout {

    private final OCRService ocrService;

    private final MemoryBuffer buffer = new MemoryBuffer();

    private final MemoryBuffer healthInsuranceCertificateBuffer = new MemoryBuffer();
    private final Image insuranceImage = new Image();
    private final Upload upload = new PdfUpload("health-insurance-image", buffer);

    private final TextField insurerCompanyName = new TextField("Company of insurance");

    public InsuranceClass(OCRService ocrService) throws IOException {
        this.ocrService = ocrService;

        setAlignItems(Alignment.CENTER); // Center all components horizontally in this layout

        upload.addSucceededListener(event -> extractDataFromInsuranceDocument());

        createInsuranceLayout();
    }

    private void extractDataFromInsuranceDocument() {
        try {
            HealthInsuranceCertificateDataResponseDto healthInsuranceCertificateDataResponseDto =
                    ocrService.getDataFromHealthInsuranceCertificate((MultipartFile) healthInsuranceCertificateBuffer.getFileData());

            if (healthInsuranceCertificateDataResponseDto != null) {
                // Use the extracted data as needed
                // Example: insurerCompanyName.setValue(healthInsuranceCertificateDataResponseDto.getInsurer());
                removeAll();
                createInsuranceLayout();
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }


    private void createInsuranceLayout() {
        VerticalLayout layout = new VerticalLayout();
        layout.setAlignItems(Alignment.CENTER); // Center all components horizontally in this layout

        layout.add(upload, insuranceImage, insurerCompanyName);

        add(layout);

    }
}
*/