package com.example.appforauslenderamt.frotn.returnofthehope;

import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.html.Anchor;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.FileBuffer;
import com.vaadin.flow.server.StreamResource;

import java.io.IOException;
import java.io.InputStream;

public class ResidenceClass extends VerticalLayout {

    private FileBuffer buffer = new FileBuffer();
    private final Anchor pdfAnchor = new Anchor();

    private VerticalLayout previousStaysLayout = new VerticalLayout();
    private VerticalLayout ResidenceAbroadLayout = new VerticalLayout();

    public ResidenceClass() throws IOException {
        setAlignItems(Alignment.CENTER); // Center all components horizontally in this layout

        Upload upload = new Upload(buffer);
        upload.setMaxFiles(1); // Максимальное количество загружаемых файлов
        upload.setAcceptedFileTypes("application/pdf"); // Разрешенные типы файлов (только PDF)

        upload.addSucceededListener(event -> {
            InputStream pdfInputStream = buffer.getInputStream();
            pdfAnchor.setHref(new StreamResource("document.pdf", () -> pdfInputStream));
            pdfAnchor.getElement().setAttribute("download", true);
            pdfAnchor.setText("Download PDF");
            pdfAnchor.setVisible(true);
        });

        // Создаем макет с полями для ввода данных о проживании
        VerticalLayout residenceLayout = createResidenceLayout();

        // Добавляем компоненты на макет
        add(upload, pdfAnchor, residenceLayout);

        // Добавляем кнопку для загрузки Enrollment Certificate и подписываем ее
        Upload enrollmentCertificateUpload = new Upload();
        enrollmentCertificateUpload.setMaxFiles(1); // Максимальное количество загружаемых файлов
        enrollmentCertificateUpload.setAcceptedFileTypes("application/pdf"); // Разрешенные типы файлов (только PDF)

        enrollmentCertificateUpload.addSucceededListener(enrollmentEvent -> {
            InputStream enrollmentCertificateInputStream = buffer.getInputStream();
            Anchor enrollmentCertificateAnchor = new Anchor();
            enrollmentCertificateAnchor.setHref(new StreamResource("enrollment-certificate.pdf", () -> enrollmentCertificateInputStream));
            enrollmentCertificateAnchor.getElement().setAttribute("download", true);
            enrollmentCertificateAnchor.setText("Download Enrollment Certificate");
            enrollmentCertificateAnchor.setVisible(true);
            add(enrollmentCertificateAnchor);
        });

        add(enrollmentCertificateUpload);

        // Подписываем "The 'end of semester' date on your document should be within your application period"
        add("The 'end of semester' date on your document should be within your application period");
    }

    private VerticalLayout createResidenceLayout() throws IOException {
        setAlignItems(Alignment.CENTER);

        VerticalLayout layout = new VerticalLayout();
        layout.setAlignItems(Alignment.CENTER); // Center all components horizontally in this layout


        TextField currentStayField = new TextField("Current place of residence in Germany (postal code, place, street, house No.)");
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

        layout.add(currentStayField, previousStayData, previousStaysLayout, ResidenceAbroadData, ResidenceAbroadLayout);

        return layout;
    }
}
