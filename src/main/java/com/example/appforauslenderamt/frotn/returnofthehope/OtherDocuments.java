package com.example.appforauslenderamt.frotn.returnofthehope;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.FileBuffer;
import com.vaadin.flow.server.StreamResource;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

public class OtherDocuments extends VerticalLayout {

    private FileBuffer biometricPhotoBuffer = new FileBuffer();
    private FileBuffer signatureBuffer = new FileBuffer();

    private Image biometricPhotoImage = new Image();
    private Image signatureImage = new Image();

    public OtherDocuments() {
        setAlignItems(Alignment.CENTER);

        H3 bioHeader = new H3("Biometric Photo");
        H3 signatureHeader = new H3("Signature");

        Upload biometricPhotoUpload = createImageUpload("Biometric Photo");
        Upload signatureUpload = createImageUpload("Signature");

        FlexLayout imageLayout = new FlexLayout();
        imageLayout.setAlignItems(Alignment.CENTER);
        imageLayout.add(biometricPhotoImage, signatureImage);

        Button saveToJsonButton = new Button("Save to JSON");
        saveToJsonButton.addClickListener(event -> {
            try {
                saveDataToJson();
                Notification.show("Data saved to JSON successfully");
            } catch (IOException e) {
                e.printStackTrace();
                Notification.show("Error saving data to JSON");
            }
        });

        add(bioHeader, biometricPhotoUpload, signatureHeader, signatureUpload, imageLayout, saveToJsonButton);
    }

    private Upload createImageUpload(String label) {
        FileBuffer buffer = new FileBuffer();
        Upload upload = new Upload(buffer);
        upload.setAcceptedFileTypes("image/*");
        upload.setMaxFiles(1);

        upload.addSucceededListener(event -> {
            InputStream imageInputStream = buffer.getInputStream();
            StreamResource streamResource = new StreamResource(label + ".png", () -> imageInputStream);
            streamResource.setContentType("image/png");

            if (label.equals("Biometric Photo")) {
                biometricPhotoImage.setSrc(streamResource);
            } else if (label.equals("Signature")) {
                signatureImage.setSrc(streamResource);
            }
        });

        return upload;
    }

    private void saveDataToJson() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.enable(SerializationFeature.INDENT_OUTPUT);

        ObjectNode root = objectMapper.createObjectNode();

        addImageDataToJson(root, "BiometricPhoto", biometricPhotoBuffer);
        addImageDataToJson(root, "Signature", signatureBuffer);

        File jsonFile = new File("data.json");
        objectMapper.writeValue(new FileOutputStream(jsonFile), root);
    }

    private void addImageDataToJson(ObjectNode root, String label, FileBuffer buffer) throws IOException {
        if (buffer.getInputStream() != null) {
            ObjectNode imageNode = root.putObject(label);
            imageNode.put("contentType", "image/png"); // Установите соответствующий тип контента здесь
            imageNode.put("fileName", label + ".png");

            ArrayNode dataArray = imageNode.putArray("data");
            byte[] imageData = buffer.getInputStream().readAllBytes();
            for (byte b : imageData) {
                dataArray.add(b);
            }
        }
    }


}
