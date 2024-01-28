package com.example.appforauslenderamt.frotn.returnofthehope;

import com.example.appforauslenderamt.controller.dto.PassportDataResponseDto;
import com.example.appforauslenderamt.service.OCRService;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.radiobutton.RadioButtonGroup;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.MemoryBuffer;
import com.vaadin.flow.server.StreamResource;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.mock.web.MockMultipartFile;


import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.HashSet;
import java.util.concurrent.atomic.AtomicReference;

public class PassportClass extends VerticalLayout {

    private final OCRService ocrService;

    private final MemoryBuffer buffer = new MemoryBuffer();
    private final Image passportImage = new Image();

    private final Upload upload = new Upload(buffer);
    private final TextField firstName = new TextField("First name");
    private final TextField lastName = new TextField("Last name");
    private final TextField nationality = new TextField("Nationality / nationalities");
    private final DatePicker dateOfBirth = new DatePicker("Date of birth");
    private final RadioButtonGroup<String> gender = new RadioButtonGroup<>("Sex", "Male", "Female", "Diverse");
    private final DatePicker validFrom = new DatePicker("Valid from");
    private final DatePicker issuedOn = new DatePicker("Issued on");


    public PassportClass(OCRService ocrService) throws IOException {
        this.ocrService = ocrService;

        setAlignItems(Alignment.CENTER); // Center all components horizontally in this layout

        upload.setMaxFiles(1); // maximum
        upload.setAcceptedFileTypes("image/*"); // Allowed types of files (only images)

        upload.addSucceededListener(event -> {
            StreamResource streamResource = new StreamResource("passport-image.png", () -> {
                byte[] imageData;
                try {
                    imageData = buffer.getInputStream().readAllBytes();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
                return new ByteArrayInputStream(imageData);
            });
            passportImage.setSrc(streamResource);
            passportImage.setVisible(true);
            try {
                extractDataFromPassport();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });

        createPassportLayout();
    }

    private void extractDataFromPassport() throws IOException {
        byte[] passportBytes = buffer.getInputStream().readAllBytes();

        // Create a MultipartFile from the byte array
        MultipartFile passportMultipartFile = new MockMultipartFile(
                "passportImage", // name of the parameter
                "passport.jpg", // filename, you can set this to the actual file name
                "image/jpeg", // content type of the file, adjust if necessary
                passportBytes
        );

        try {
            PassportDataResponseDto passportDataResponseDto =
                    ocrService.getDataFromPassport(passportMultipartFile);

            // Log the raw response for debugging
            System.out.println("OCR Service Response: " + passportDataResponseDto);

            // Set field values from the DTO
            firstName.setValue(passportDataResponseDto.getFirstName());
            lastName.setValue(passportDataResponseDto.getFamilyName());
            nationality.setValue(passportDataResponseDto.getNationality());
            dateOfBirth.setValue(LocalDate.parse(passportDataResponseDto.getDateOfBirth(), DateTimeFormatter.ofPattern("dd/MM/yy")));
            gender.setValue(passportDataResponseDto.getSex());
            validFrom.setValue(LocalDate.parse(passportDataResponseDto.getStartDate(), DateTimeFormatter.ofPattern("dd/MM/yy")));
            issuedOn.setValue(LocalDate.parse(passportDataResponseDto.getIssueDate(), DateTimeFormatter.ofPattern("dd/MM/yy")));

            // Redraw the layout
            removeAll();
            createPassportLayout();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Thread was interrupted", e);
        } catch (IOException e) {
            throw new IOException("IO exception occurred", e);
        } catch (Exception e) {
            e.printStackTrace();
            // Handle other exceptions or rethrow
        }
    }


    private void createPassportLayout() {
        VerticalLayout layout = new VerticalLayout();
        layout.setAlignItems(Alignment.CENTER); // Center all components horizontally in this layout

        DatePicker.DatePickerI18n i18n = new DatePicker.DatePickerI18n()
                .setToday("Today")
                .setCancel("Cancel")
                .setFirstDayOfWeek(1)
                .setMonthNames(Arrays.asList("January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"))
                .setWeekdays(Arrays.asList("Sunday", "Monday", "Tuesday", "Wednesday",
                        "Thursday", "Friday", "Saturday"))
                .setWeekdaysShort(Arrays.asList("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"));

        dateOfBirth.setI18n(i18n);
        TextField placeOfBirth = new TextField("Place of birth (place, country)");
        ComboBox<String> maritalStatus = new ComboBox<>("Marital status");
        maritalStatus.setItems("Single", "Married", "Divorced", "Widowed");
        maritalStatus.setPlaceholder("Select...");
        ComboBox<String> colourOfEyes = new ComboBox<>("Colour of eyes");
        colourOfEyes.setItems("Blue", "Green", "Gray", "Brown");
        colourOfEyes.setPlaceholder("Select...");
        TextField mobile = new TextField("Mobile (optional)");
        TextField email = new TextField("E-mail (optional)");
        TextField passportNo = new TextField("Passport No");
        validFrom.setI18n(i18n);
        DatePicker validTill = new DatePicker("Valid till");
        validTill.setI18n(i18n);
        TextField issuedBy = new TextField("Issued by");
        issuedOn.setI18n(i18n);

        layout.add(upload, passportImage,
                firstName, lastName, dateOfBirth, placeOfBirth, nationality,
                maritalStatus, colourOfEyes, mobile, email, passportNo,
                validFrom, validTill, issuedBy, issuedOn, gender
        );

        add(layout);
    }
}

