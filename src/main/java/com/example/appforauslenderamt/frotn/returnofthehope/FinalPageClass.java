package com.example.appforauslenderamt.frotn.returnofthehope;

import com.example.appforauslenderamt.controller.dto.UserDataRequestDto;
import com.example.appforauslenderamt.entity.ColourOfEyes;
import com.example.appforauslenderamt.entity.MaritalStatus;
import com.example.appforauslenderamt.entity.PassportType;
import com.example.appforauslenderamt.entity.UserPersonalData;
import com.example.appforauslenderamt.service.GenerateReportService;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.IFrame;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.StreamResource;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
@Route("finale")

public class FinalPageClass extends VerticalLayout {
    private final GenerateReportService generateReportService;
    private Dialog pdfDialog = new Dialog();
    private Image pdfFrame = new Image();

    public FinalPageClass(GenerateReportService generateReportService) {
        this.generateReportService = generateReportService;

        // Инициализация диалога для PDF
        pdfDialog.setWidth("80%");
        pdfDialog.setHeight("90%");
        pdfDialog.add(pdfFrame);

        // Кнопка для генерации и отображения PDF
        Button generatePdfButton = new Button("Generate and View PDF", event -> {
            try {
                UserDataRequestDto userData = UserDataRequestDto.builder()
                        .personalData(null)
                        .maritalStatus(null)
                        .maritalStatusSince("")
                        .colourOfEyes(null)
                        .height("")
                        .mobileNumber("")
                        .email("")
                        .passportType(null)
                        .customPassportType("")
                        .passportNumber("")
                        .validFrom("")
                        .validTill("")
                        .issuedBy("")
                        .issuedOn("")
                        .isPreviousStaysInGermany(null)
                        .previousStaysInGermany(null)
                        .isPlaceOfResidenceAbroadRetains(null)
                        .placeOfResidenceAbroad(null)
                        .partnerPersonalData(null)
                        .childrenPersonalData(null)
                        .motherPersonalData(null)
                        .fatherPersonalData(null)
                        .purposeOfStayInGermany(null)
                        .trainingTypes(null)
                        .jobSeekingType(null)
                        .employer("")
                        .gainfulEmploymentType(null)
                        .reasonsDefinedUnderInternationalLaw(null)
                        .applicationForExhibitionType(null)
                        .applicationForExhibitionsReason("")
                        .familyReasonType(null) // Пустое значение
                        .specialResidenceRightsType(null) // Пустое значение
                        .meansOfSupport("") // Пустая строка
                        .needsBenefitsUnderSocialLaw(null) // Пустое значение
                        .benefitsUnderSocialLaw(null) // Пустое значение
                        .healthInsuranceInfo(null) // Пустой объект данных
                        .offencesInfo(null) // Пустой объект данных
                        .residencePermitValidity(null) // Пустой объект данных
                        .applicationPlace("") // Пустая строка
                        .build();

                //UserDataRequestDto userData = new UserDataRequestDto(); // Пустой объект данных
                MultipartFile[] documents = new MultipartFile[0]; // Пустой массив документов
                MultipartFile signatureImage = null; // Пустое изображение подписи

                byte[] pdfContent = generateReportService.generatePdfFromHtml(userData, documents, signatureImage);

                // Создать StreamResource для PDF
                StreamResource pdfResource = new StreamResource("application.pdf", () -> new ByteArrayInputStream(pdfContent));
                pdfResource.setContentType("application/pdf");

                // Обновить IFrame для отображения PDF
                pdfFrame.setSrc(pdfResource);
                pdfFrame.setSizeFull();

                pdfDialog.open(); // Открыть диалог с PDF
            } catch (Exception e) {
                e.printStackTrace();
                // Обработайте исключения здесь
            }


        });

        add(generatePdfButton);
    }

    // Предполагаем, что у вас есть конструктор по умолчанию для всех ваших сущностей



}
