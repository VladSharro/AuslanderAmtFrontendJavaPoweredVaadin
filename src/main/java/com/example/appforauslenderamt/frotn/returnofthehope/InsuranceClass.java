package com.example.appforauslenderamt.frotn.returnofthehope;

import com.example.appforauslenderamt.controller.dto.HealthInsuranceCertificateDataResponseDto;
import com.example.appforauslenderamt.service.OCRService;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.MemoryBuffer;

import java.io.IOException;

public class InsuranceClass extends VerticalLayout {

    private final OCRService ocrService;

    private final MemoryBuffer buffer = new MemoryBuffer();
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
                    ocrService.getDataFromHealthInsuranceCertificate(buffer.getInputStream().readAllBytes());
            insurerCompanyName.setValue(healthInsuranceCertificateDataResponseDto.getInsurer());
            removeAll();
            createInsuranceLayout();
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
