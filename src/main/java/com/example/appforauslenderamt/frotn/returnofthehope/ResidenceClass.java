package com.example.appforauslenderamt.frotn.returnofthehope;

import com.example.appforauslenderamt.controller.dto.CertificateOfEnrollmentDataResponseDto;
import com.example.appforauslenderamt.service.OCRService;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.MemoryBuffer;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public class ResidenceClass extends VerticalLayout {

    private final OCRService ocrService;
    private final MemoryBuffer immatriculationBuffer = new MemoryBuffer();
    private final Upload immatriculationUpload = new Upload(immatriculationBuffer);
    private TextField currentStayField = new TextField("Current place of residence in Germany (postal code, place, street, house No.)");
    private VerticalLayout previousStaysLayout = new VerticalLayout();
    private VerticalLayout residenceAbroadLayout = new VerticalLayout();
    private ComboBox<String> previousStayData = new ComboBox<>("Previous stays in Germany?");
    private ComboBox<String> residenceAbroadData = new ComboBox<>("Place of residence abroad (postal code, place, street, country)?");
    public ResidenceClass(OCRService ocrService) {
        this.ocrService = ocrService;

        setAlignItems(Alignment.CENTER); // Center all components horizontally in this layout

        immatriculationUpload.setAcceptedFileTypes("application/pdf"); // Accept only PDF files
        immatriculationUpload.setMaxFiles(1); // Allow uploading only one file
        immatriculationUpload.addSucceededListener(event -> extractDataFromImmatriculation());

        createLayout();
    }

    private void createLayout() {
        setAlignItems(Alignment.CENTER);
        VerticalLayout layout = new VerticalLayout();
        layout.setAlignItems(Alignment.CENTER);

        // ... (setup for currentStayField, immatriculationUpload, etc.)

        // Setup for previous stays
        previousStaysLayout.setVisible(false);
        previousStayData.setItems("Yes", "No");
        previousStayData.setPlaceholder("Select...");
        previousStayData.addValueChangeListener(event -> {
            boolean hasStay = "Yes".equals(event.getValue());
            previousStaysLayout.setVisible(hasStay);
            if (hasStay) {
                // Assume previousStayAdding.addPreviousStayFields adds the necessary fields to previousStaysLayout
                previousStayAdding.addPreviousStayFields(previousStaysLayout);
            } else {
                previousStaysLayout.removeAll();
            }
        });

        // Setup for residence abroad
        residenceAbroadLayout.setVisible(false);
        residenceAbroadData.setItems("Yes", "No");
        residenceAbroadData.setPlaceholder("Select...");
        residenceAbroadData.addValueChangeListener(event -> {
            boolean hasAbroad = "Yes".equals(event.getValue());
            residenceAbroadLayout.setVisible(hasAbroad);
            if (hasAbroad) {
                // Assume previousStayAdding.addResidenceAbroadFields adds the necessary fields to residenceAbroadLayout
                previousStayAdding.addResidenceAbroadFields(residenceAbroadLayout);
            } else {
                residenceAbroadLayout.removeAll();
            }
        });

        layout.add(
                immatriculationUpload,
                currentStayField,
                previousStayData,
                previousStaysLayout,
                residenceAbroadData,
                residenceAbroadLayout
        );

        add(layout);
    }

    private void extractDataFromImmatriculation() {
        try {
            byte[] immatriculationBytes = immatriculationBuffer.getInputStream().readAllBytes();
            MultipartFile immatriculationMultipartFile = new MockMultipartFile(
                    "immatriculation", // name of the parameter
                    "immatriculation.pdf", // filename, you can set this to the actual file name
                    "application/pdf", // content type of the file
                    immatriculationBytes
            );

            CertificateOfEnrollmentDataResponseDto certificateData =
                    ocrService.getDataFromCertificateOfEnrollment(immatriculationMultipartFile);

            // Assuming that you want to set the address to the 'currentStayField'
            currentStayField.setValue(certificateData.getAddress());
            removeAll();
            createLayout();
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}




/*package com.example.appforauslenderamt.frotn.returnofthehope;

import com.example.appforauslenderamt.controller.dto.CertificateOfEnrollmentDataResponseDto;
import com.example.appforauslenderamt.controller.dto.FinancialDocumentResponseDto;
import com.example.appforauslenderamt.service.OCRService;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.html.Anchor;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.FileBuffer;
import com.vaadin.flow.component.upload.receivers.MemoryBuffer;
import com.vaadin.flow.server.StreamResource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

public class ResidenceClass extends VerticalLayout {

    private final OCRService ocrService;

    private FileBuffer buffer = new FileBuffer();
    private final Anchor pdfAnchor = new Anchor();

    private VerticalLayout previousStaysLayout = new VerticalLayout();
    private VerticalLayout ResidenceAbroadLayout = new VerticalLayout();

    private final MemoryBuffer ImmutriculationtBuffer = new MemoryBuffer();


    private final Upload ImmutriculationUpload = new PdfUpload("Immutriculation", ImmutriculationtBuffer);

    private TextField currentStayField = new TextField("Current place of residence in Germany (postal code, place, street, house No.)");



    public ResidenceClass(OCRService ocrService){
        this.ocrService = ocrService;

        setAlignItems(Alignment.CENTER); // Center all components horizontally in this layout

        ImmutriculationUpload.addSucceededListener(e -> extractDataFromImmutricalation());



        createLayout();
    }

    private void createLayout(){
        setAlignItems(Alignment.CENTER);

        VerticalLayout layout = new VerticalLayout();
        layout.setAlignItems(Alignment.CENTER); // Center all components horizontally in this layout


        //TextField currentStayField = new TextField("Current place of residence in Germany (postal code, place, street, house No.)");
        currentStayField.getElement().getStyle().set("margin", "auto");

        previousStaysLayout.setVisible(false);
        ResidenceAbroadLayout.setVisible(false);

        ComboBox<String> previousStayData = new ComboBox<>("Previous stays in Germany?");
        previousStayData.setItems("Yes", "No");
        previousStayData.setPlaceholder("Select...");

        previousStayData.addValueChangeListener(event -> {
            boolean hasStay = "Yes".equals(event.getValue());
            previousStaysLayout.setVisible(hasStay);
            if (hasStay) {
                previousStayAdding.addPreviousStayFields(previousStaysLayout);
            } else {
                previousStaysLayout.removeAll();
            }
        });

        ComboBox<String> ResidenceAbroadData = new ComboBox<>("Place of residence abroad (postal code, place, street, country)?");
        ResidenceAbroadData.setItems("Yes", "No");
        ResidenceAbroadData.setPlaceholder("Select...");

        ResidenceAbroadData.addValueChangeListener(event -> {
            boolean hasAbroad = "Yes".equals(event.getValue());
            ResidenceAbroadLayout.setVisible(hasAbroad);
            if (hasAbroad) {
                previousStayAdding.addResidenceAbroadFields(ResidenceAbroadLayout);
            } else {
                ResidenceAbroadLayout.removeAll();
            }
        });

        add(
                ImmutriculationUpload, currentStayField, previousStayData, previousStaysLayout, ResidenceAbroadData, ResidenceAbroadLayout

        );

        //layout.add(currentStayField, previousStayData, previousStaysLayout, ResidenceAbroadData, ResidenceAbroadLayout);

        //return layout;
    }

    private void extractDataFromImmutricalation() {
        try {
            CertificateOfEnrollmentDataResponseDto certificateData =
                    ocrService.getDataFromCertificateOfEnrollment((MultipartFile) ImmutriculationtBuffer.getFileData());

            // Assuming that you want to set the address to the 'currentStayField'
            currentStayField.setValue(certificateData.getAddress());
            removeAll();
            createLayout();
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }

}*/
