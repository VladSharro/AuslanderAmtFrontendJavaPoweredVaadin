package com.example.appforauslenderamt.frotn.returnofthehope;

import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.MemoryBuffer;
import com.vaadin.flow.server.StreamResource;

import java.io.ByteArrayInputStream;
import java.io.IOException;

public class VisaClass extends VerticalLayout{

    private MemoryBuffer buffer = new MemoryBuffer();
    private final Image visaImage = new Image();

    public VisaClass() throws IOException {
        setAlignItems(FlexComponent.Alignment.CENTER); // Center all components horizontally in this layout

        Upload upload = new Upload(buffer);
        upload.setMaxFiles(1); // Максимальное количество загружаемых файлов
        upload.setAcceptedFileTypes("image/*"); // Разрешенные типы файлов (только изображения)

        upload.addSucceededListener(event -> {
            StreamResource streamResource = new StreamResource("passport-image.png", () -> {
                byte[] imageData = new byte[0];
                try {
                    imageData = buffer.getInputStream().readAllBytes();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
                return new ByteArrayInputStream(imageData);
            });
            visaImage.setSrc(streamResource);
            visaImage.setVisible(true);
        });

        // Создаем макет с полями для ввода данных паспорта
        VerticalLayout passportLayout = createVisaLayout();

        // Добавляем компоненты на макет
        add(upload, visaImage, passportLayout);
    }

    private VerticalLayout createVisaLayout() throws IOException {
        VerticalLayout layout = new VerticalLayout();
        layout.setAlignItems(FlexComponent.Alignment.CENTER); // Center all components horizontally in this layout


        DatePicker dateOfLastEntryField = new DatePicker("Date of last entry");
        dateOfLastEntryField.getElement().getStyle().set("margin", "auto");

        ComboBox<String> entryVisaType = new ComboBox<>("Entry visa type");
        entryVisaType.setItems("With national Visa", "With Schengen visa", "Without visa", "With residence permit by another EU member state");

        DatePicker visaIssuedByField = new DatePicker("Visa issued by");
        visaIssuedByField.getElement().getStyle().set("margin", "auto");

        DatePicker issuedOn = new DatePicker("Issued on");
        issuedOn.getElement().getStyle().set("margin", "auto");

        DatePicker visaNoField = new DatePicker("Visa No.");
        visaNoField.getElement().getStyle().set("margin", "auto");

        DatePicker validFrom = new DatePicker("Valid from");
        validFrom.getElement().getStyle().set("margin", "auto");

        DatePicker validTo = new DatePicker("Valid to");
        validTo.getElement().getStyle().set("margin", "auto");

        DatePicker lengthOfStayField = new DatePicker("Length of stay");
        lengthOfStayField.getElement().getStyle().set("margin", "auto");

        ComboBox<String> studyVisa = new ComboBox<>("Is it study visa");
        studyVisa.setItems("Yes", "No");

        layout.add(
                dateOfLastEntryField, entryVisaType, visaIssuedByField, issuedOn, visaNoField,
                validFrom, validTo, lengthOfStayField, studyVisa
        );

        return layout;
    }

}
