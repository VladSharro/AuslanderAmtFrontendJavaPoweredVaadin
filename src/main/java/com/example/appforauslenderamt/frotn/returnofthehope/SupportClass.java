package com.example.appforauslenderamt.frotn.returnofthehope;

import com.example.appforauslenderamt.controller.dto.FinancialDocumentResponseDto;
import com.example.appforauslenderamt.controller.dto.PassportDataResponseDto;
import com.example.appforauslenderamt.service.OCRService;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.IntegerField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.FileBuffer;
import com.vaadin.flow.component.upload.receivers.MemoryBuffer;
import com.vaadin.flow.server.StreamResource;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class SupportClass extends VerticalLayout {

    private final OCRService ocrService;

    private final VerticalLayout bookLayouts = new VerticalLayout();

    private final MemoryBuffer workingContractBuffer = new MemoryBuffer();
    private final MemoryBuffer blockedAccountBuffer = new MemoryBuffer();
    private final Upload workingContractUpload = new PdfUpload("working-contract", workingContractBuffer);
    private final Upload blockedAccountUpload = new PdfUpload("blocked-account", blockedAccountBuffer);
    private final TextField workingContractSalary = new TextField("Working contract salary");
    private final TextField blockAccountMoney = new TextField("Block account money");

    public SupportClass(OCRService ocrService) {
        this.ocrService = ocrService;

        setAlignItems(FlexComponent.Alignment.CENTER);

        workingContractUpload.addSucceededListener(e -> extractDataFromWorkingContract());
        blockedAccountUpload.addSucceededListener(e -> extractDataFromBlockAccount());

        createLayout();
    }

    private void createLayout() {
        ComboBox<String> bookInfo = new ComboBox<>("Do you get benefits under the Second or Twelfth Book of the Code of Social Law?");
        bookInfo.setItems("Yes", "No");
        bookInfo.setPlaceholder("Select...");

        bookInfo.addValueChangeListener(event -> {
            boolean hasBook = "Yes".equals(event.getValue());
            bookLayouts.setVisible(hasBook);
            if (hasBook) {
                AddingSupportField.benefitsBook(bookLayouts);
            } else {
                bookLayouts.removeAll();
            }
        });

        // Add other components as needed
        IntegerField textField = new IntegerField("Some Text Field");
        IntegerField datePicker = new IntegerField("Some Date Picker");


        // Create a button to submit the form
        Button submitButton = new Button("Submit");

        // Handle form submission logic here
        submitButton.addClickListener(event -> {
            // Get values from components and process the form
            String selectedBookInfo = bookInfo.getValue();
            // Get values from other components as needed
            // Handle the form submission logic
        });

        // Add all components to the layout
        add(
                bookInfo,
                bookLayouts,
                workingContractUpload,
                blockedAccountUpload,
//                otherIssuedUpload,
                workingContractSalary,
                blockAccountMoney,
                submitButton
        );
    }

    private void extractDataFromWorkingContract() {
        try {
            FinancialDocumentResponseDto workingContractResponseDto =
                    ocrService.getDataFromWorkingContract(workingContractBuffer.getInputStream().readAllBytes());
            workingContractSalary.setValue(workingContractResponseDto.getSum());
            removeAll();
            createLayout();
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }

    private void extractDataFromBlockAccount() {
        try {
            FinancialDocumentResponseDto blockAccountResponseDto =
                    ocrService.getDataFromBlockedAccount(blockedAccountBuffer.getInputStream().readAllBytes());
            blockAccountMoney.setValue(blockAccountResponseDto.getSum());
            removeAll();
            createLayout();
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }

}

