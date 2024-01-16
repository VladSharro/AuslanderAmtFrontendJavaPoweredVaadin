package com.example.appforauslenderamt.service;

import com.example.appforauslenderamt.config.OCRConfig;
import com.example.appforauslenderamt.controller.dto.*;
import com.example.appforauslenderamt.entity.*;
import com.example.appforauslenderamt.exceptions.InvalidDataException;
import com.google.common.collect.Sets;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.pdf.PdfWriter;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.graphics.image.LosslessFactory;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;
import org.xhtmlrenderer.pdf.ITextRenderer;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.imageio.ImageIO;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.Properties;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class GenerateReportService {

    private final OCRConfig OCRConfig;

    @Autowired
    public GenerateReportService(OCRConfig OCRConfig) {
        this.OCRConfig = OCRConfig;
    }

    public PassportDataResponseDto getDataFromPassport(MultipartFile passportImage)
            throws IOException, InterruptedException {
        String line = processWithOCR(passportImage, OCRConfig.getPassportAnalysisFilePath());
        // Process line of the output here
        String[] userData = line.split(",");

        return PassportDataResponseDto.builder()
                .familyName(userData[0])
                .firstName(userData[1])
                .nationality(userData[2])
                .dateOfBirth(userData[3])
                .sex(userData[4])
                .startDate(userData[5])
                .build();

    }

    public CertificateOfEnrollmentDataResponseDto getDataFromCertificateOfEnrollment(
            MultipartFile certificateOfEnrollment)
            throws IOException, InterruptedException {
        String line = processWithOCR(certificateOfEnrollment, OCRConfig.getCertificateOfEnrollmentAnalysisFilePath());
        // Process line of the output here
        String[] userData = line.split(",");

        CertificateOfEnrollmentDataResponseDto responseDto = CertificateOfEnrollmentDataResponseDto.builder()
                .name(userData[0])
                .dateOfBirth(userData[1])
                .placeOfBirth(userData[2])
                .address(userData[3])
                .semesterEndsDate(userData[4])
                .build();

        if (LocalDate.parse(responseDto.getSemesterEndsDate(),
                DateTimeFormatter.ofPattern("dd.MM.yyyy")).isBefore(LocalDate.now())) {
            throw new InvalidDataException("The document was expired");
        }

        return responseDto;

    }

    public HealthInsuranceCertificateDataResponseDto getDataFromHealthInsuranceCertificate(
            MultipartFile healthInsuranceCertificateImage)
            throws IOException, InterruptedException {
        String line = processWithOCR(healthInsuranceCertificateImage,
                OCRConfig.getHealthInsuranceCertificateAnalysisFilePath());
        // Process line of the output here
        String[] userData = line.split(",");

        return HealthInsuranceCertificateDataResponseDto.builder()
                .firstName(userData[0])
                .familyName(userData[1])
                .insurer(userData[2])
                .dateOfStart(userData[3])
                .build();

    }

    public FinancialDocumentResponseDto getDataFromFinancialDocument(MultipartFile financialDocument)
            throws IOException, InterruptedException {
        String line = processWithOCR(financialDocument, OCRConfig.getFinancialDocumentAnalysisFilePath());
        // Process line of the output here
        String[] userData = line.split(",");

        return FinancialDocumentResponseDto.builder()
                .sum(userData[0])
                .date(userData[1])
                .build();

    }

    public UserDataRequestDto extractDataFromFilledForm(
            MultipartFile financialDocument)
            throws IOException, InterruptedException {
        String line = processWithOCR(financialDocument, "OCR/Extraction_Data.py");
        // Process line of the output here
        String[] userData = line.split(",");

        return UserDataRequestDto.builder()
                .build();

    }

    public void generatePdfFromHtml(UserDataRequestDto userDataRequestDto, MultipartFile[] documents,
                                    MultipartFile signatureImage)
            throws IOException, DocumentException,
            InterruptedException, com.lowagie.text.DocumentException {
        String html = parseThymeleafTemplate(userDataRequestDto);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        Document document = new Document();
        PdfWriter writer = PdfWriter.getInstance(document, outputStream);

        document.open();

        ITextRenderer renderer = new ITextRenderer();
        renderer.setDocumentFromString(html);
        renderer.layout();
        renderer.createPDF(outputStream);

        outputStream.close();
        mergePdf(outputStream, documents);
        addHandprintedSignatureToPDF("src/main/resources/user_form.pdf", signatureImage);
//        sendEmail("src/main/resources/user_form.pdf");
    }

    private String parseThymeleafTemplate(UserDataRequestDto userDataRequestDto) {
        if (userDataRequestDto.getChildrenPersonalData() != null &&
                userDataRequestDto.getChildrenPersonalData().size() > 3) {
            throw new InvalidDataException("Information about more than 3 children cannot be entered in form");
        }

        ClassLoaderTemplateResolver templateResolver = new ClassLoaderTemplateResolver();
        templateResolver.setSuffix(".html");
        templateResolver.setTemplateMode(TemplateMode.HTML);

        TemplateEngine templateEngine = new TemplateEngine();
        templateEngine.setTemplateResolver(templateResolver);

        Context context = new Context();

        if (userDataRequestDto.getPersonalData().getPreviousNames() == null ||
                userDataRequestDto.getPersonalData().getPreviousNames().isEmpty()) {
            context.setVariable("family_name", userDataRequestDto.getPersonalData().getFamilyName());
        } else {
            context.setVariable("family_name", userDataRequestDto.getPersonalData().getFamilyName() + " " +
                    String.join(", ", userDataRequestDto.getPersonalData().getPreviousNames()));
        }
        context.setVariable("first_name", userDataRequestDto.getPersonalData().getFirstName());
        context.setVariable("date_of_birth", userDataRequestDto.getPersonalData().getDateOfBirth());
        context.setVariable("place_of_birth", userDataRequestDto.getPersonalData().getPlaceOfBirth());
        context.setVariable("nationalities", String.join(", ",
                userDataRequestDto.getPersonalData().getNationalities()));
        context.setVariable("sex_male", userDataRequestDto.getPersonalData().getSex().equals(Sex.MALE));
        context.setVariable("sex_female", userDataRequestDto.getPersonalData().getSex().equals(Sex.FEMALE));
        context.setVariable("sex_diversity", userDataRequestDto.getPersonalData().getSex().equals(Sex.DIVERSITY));
        context.setVariable("marital_status_single",
                userDataRequestDto.getMaritalStatus().equals(MaritalStatus.SINGLE));
        context.setVariable("marital_status_married",
                userDataRequestDto.getMaritalStatus().equals(MaritalStatus.MARRIED));
        context.setVariable("marital_in_registered_partnership",
                userDataRequestDto.getMaritalStatus().equals(MaritalStatus.LIVING_IN_REGISTERED_PARTNERSHIP));
        context.setVariable("marital_status_divorced",
                userDataRequestDto.getMaritalStatus().equals(MaritalStatus.DIVORCED));
        context.setVariable("marital_status_widowed",
                userDataRequestDto.getMaritalStatus().equals(MaritalStatus.WIDOWED));
        context.setVariable("marital_status_separated",
                userDataRequestDto.getMaritalStatus().equals(MaritalStatus.SEPARATED));
        context.setVariable("marital_status_since", userDataRequestDto.getMaritalStatusSince());
        context.setVariable("color_of_eyes_blue", userDataRequestDto.getColourOfEyes().equals(ColourOfEyes.BLUE));
        context.setVariable("color_of_eyes_grey", userDataRequestDto.getColourOfEyes().equals(ColourOfEyes.GREY));
        context.setVariable("color_of_eyes_green",
                userDataRequestDto.getColourOfEyes().equals(ColourOfEyes.GREEN));
        context.setVariable("color_of_eyes_brown",
                userDataRequestDto.getColourOfEyes().equals(ColourOfEyes.BROWN));
        context.setVariable("height", userDataRequestDto.getHeight());
        context.setVariable("mobile_number", userDataRequestDto.getMobileNumber());
        context.setVariable("email", userDataRequestDto.getEmail());
        context.setVariable("kind_of_passport_passport",
                userDataRequestDto.getPassportType().equals(PassportType.PASSPORT));
        context.setVariable("kind_of_passport_id_cart",
                userDataRequestDto.getPassportType().equals(PassportType.ID_CARD));
        context.setVariable("kind_of_passport_other",
                userDataRequestDto.getPassportType().equals(PassportType.OTHER));

        if (userDataRequestDto.getPassportType().equals(PassportType.OTHER)) {
            context.setVariable("kind_of_passport", userDataRequestDto.getCustomPassportType());
        }

        context.setVariable("passport_number", userDataRequestDto.getPassportNumber());
        context.setVariable("valid_from_till", String.format("%s / %s", userDataRequestDto.getValidFrom(),
                userDataRequestDto.getValidTill()));
        context.setVariable("passport_issued_by", userDataRequestDto.getIssuedBy());
        context.setVariable("passport_issued_on", userDataRequestDto.getIssuedOn());
        context.setVariable("current_place_of_residence_in_Germany",
                userDataRequestDto.getPersonalData().getPlaceOfResidenceInGermany());
        context.setVariable("previous_stay_in_Germany_no", !userDataRequestDto.getIsPreviousStaysInGermany());
        context.setVariable("previous_stay_in_Germany_yes", userDataRequestDto.getIsPreviousStaysInGermany());

        if (userDataRequestDto.getIsPreviousStaysInGermany()) {
            context.setVariable("previous_stay_in_Germany_from",
                    userDataRequestDto.getPreviousStaysInGermany().getFromDate());
            context.setVariable("previous_stay_in_Germany_to",
                    userDataRequestDto.getPreviousStaysInGermany().getToDate());
            context.setVariable("previous_stay_in_German_place", userDataRequestDto.getPreviousStaysInGermany());
        }

        context.setVariable("place_of_residence_abroad_retained",
                userDataRequestDto.getIsPlaceOfResidenceAbroadRetains());
        context.setVariable("place_of_residence_abroad_not_retained",
                !userDataRequestDto.getIsPlaceOfResidenceAbroadRetains());

        if (userDataRequestDto.getIsPlaceOfResidenceAbroadRetains()) {
            context.setVariable("place_of_residence_abroad", userDataRequestDto.getPlaceOfResidenceAbroad());
        }

        if (userDataRequestDto.getPartnerPersonalData().getPreviousNames() == null ||
                userDataRequestDto.getPartnerPersonalData().getPreviousNames().isEmpty()) {
            context.setVariable("partner_family_name",
                    userDataRequestDto.getPartnerPersonalData().getFamilyName());
        } else {
            context.setVariable("partner_family_name",
                    userDataRequestDto.getPartnerPersonalData().getFamilyName() + " " +
                            String.join(", ", userDataRequestDto.getPartnerPersonalData().getPreviousNames()));
        }

        context.setVariable("partner_first_name", userDataRequestDto.getPartnerPersonalData().getFirstName());
        context.setVariable("partner_date_of_birth", userDataRequestDto.getPartnerPersonalData().getDateOfBirth());
        context.setVariable("partner_place_of_birth", userDataRequestDto.getPartnerPersonalData().getPlaceOfBirth());
        context.setVariable("partner_nationalities", String.join(", ",
                userDataRequestDto.getPartnerPersonalData().getNationalities()));
        context.setVariable("partner_sex_male",
                userDataRequestDto.getPartnerPersonalData().getSex().equals(Sex.MALE));
        context.setVariable("partner_sex_female",
                userDataRequestDto.getPartnerPersonalData().getSex().equals(Sex.FEMALE));
        context.setVariable("partner_sex_diversity",
                userDataRequestDto.getPartnerPersonalData().getSex().equals(Sex.DIVERSITY));
        context.setVariable("partner_current_place_of_residence_in_Germany",
                userDataRequestDto.getPartnerPersonalData().getPlaceOfResidenceInGermany());

        if (userDataRequestDto.getChildrenPersonalData() != null &&
                !userDataRequestDto.getChildrenPersonalData().isEmpty()) {
            for (int i = 0; i < userDataRequestDto.getChildrenPersonalData().size(); i++) {
                if (userDataRequestDto.getChildrenPersonalData().get(i).getPreviousNames() == null ||
                        userDataRequestDto.getPersonalData().getPreviousNames().isEmpty()) {
                    context.setVariable(String.format("child%d_family_name", i + 1),
                            userDataRequestDto.getChildrenPersonalData().get(i).getFamilyName());
                } else {
                    context.setVariable(String.format("child%d_family_name", i + 1),
                            userDataRequestDto.getChildrenPersonalData().get(i).getFamilyName() + " " +
                                    String.join(", ",
                                            userDataRequestDto.getChildrenPersonalData().get(i).getPreviousNames()));
                }
                context.setVariable(String.format("child%d_first_name", i + 1),
                        userDataRequestDto.getChildrenPersonalData().get(i).getFirstName());
                context.setVariable(String.format("child%d_date_of_birth", i + 1),
                        userDataRequestDto.getChildrenPersonalData().get(i).getDateOfBirth());
                context.setVariable(String.format("child%d_place_of_birth", i + 1),
                        userDataRequestDto.getChildrenPersonalData().get(i).getPlaceOfBirth());
                context.setVariable(String.format("child%d_nationalities", i + 1), String.join(", ",
                        userDataRequestDto.getChildrenPersonalData().get(i).getNationalities()));
                context.setVariable(String.format("child%d_sex_male", i + 1),
                        userDataRequestDto.getChildrenPersonalData().get(i).getSex().equals(Sex.MALE));
                context.setVariable(String.format("child%d_sex_female", i + 1),
                        userDataRequestDto.getChildrenPersonalData().get(i).getSex().equals(Sex.FEMALE));
                context.setVariable(String.format("child%d_sex_diversity", i + 1),
                        userDataRequestDto.getChildrenPersonalData().get(i).getSex().equals(Sex.DIVERSITY));
                context.setVariable(String.format("child%d_current_place_of_residence_in_Germany", i + 1),
                        userDataRequestDto.getChildrenPersonalData().get(i).getPlaceOfResidenceInGermany());
            }

        }

        if (userDataRequestDto.getFatherPersonalData().getPreviousNames() == null ||
                userDataRequestDto.getFatherPersonalData().getPreviousNames().isEmpty()) {
            context.setVariable("father_family_name",
                    userDataRequestDto.getFatherPersonalData().getFamilyName());
        } else {
            context.setVariable("father_family_name",
                    userDataRequestDto.getFatherPersonalData().getFamilyName() + " " +
                            String.join(", ", userDataRequestDto.getFatherPersonalData().getPreviousNames()));
        }

        context.setVariable("father_first_name", userDataRequestDto.getFatherPersonalData().getFirstName());
        context.setVariable("father_date_of_birth", userDataRequestDto.getFatherPersonalData().getDateOfBirth());
        context.setVariable("father_place_of_birth", userDataRequestDto.getFatherPersonalData().getPlaceOfBirth());
        context.setVariable("father_nationalities", String.join(", ",
                userDataRequestDto.getFatherPersonalData().getNationalities()));
        context.setVariable("father_sex_male",
                userDataRequestDto.getFatherPersonalData().getSex().equals(Sex.MALE));
        context.setVariable("father_sex_female",
                userDataRequestDto.getFatherPersonalData().getSex().equals(Sex.FEMALE));
        context.setVariable("father_sex_diversity",
                userDataRequestDto.getFatherPersonalData().getSex().equals(Sex.DIVERSITY));

        if (userDataRequestDto.getMotherPersonalData().getPreviousNames() == null ||
                userDataRequestDto.getMotherPersonalData().getPreviousNames().isEmpty()) {
            context.setVariable("mother_family_name",
                    userDataRequestDto.getMotherPersonalData().getFamilyName());
        } else {
            context.setVariable("mother_family_name",
                    userDataRequestDto.getMotherPersonalData().getFamilyName() + " " +
                            String.join(", ", userDataRequestDto.getMotherPersonalData().getPreviousNames()));
        }

        context.setVariable("mother_first_name", userDataRequestDto.getMotherPersonalData().getFirstName());
        context.setVariable("mother_date_of_birth", userDataRequestDto.getMotherPersonalData().getDateOfBirth());
        context.setVariable("mother_place_of_birth", userDataRequestDto.getMotherPersonalData().getPlaceOfBirth());
        context.setVariable("mother_nationalities", String.join(", ",
                userDataRequestDto.getMotherPersonalData().getNationalities()));
        context.setVariable("mother_sex_male",
                userDataRequestDto.getMotherPersonalData().getSex().equals(Sex.MALE));
        context.setVariable("mother_sex_female",
                userDataRequestDto.getMotherPersonalData().getSex().equals(Sex.FEMALE));
        context.setVariable("mother_sex_diversity",
                userDataRequestDto.getMotherPersonalData().getSex().equals(Sex.DIVERSITY));
        context.setVariable("parents_place_of_residence_in_Germany",
                userDataRequestDto.getMotherPersonalData().getPlaceOfResidenceInGermany());
        context.setVariable("purpose_of_stay_in_Germany_remains_unchanged",
                !userDataRequestDto.getPurposeOfStayInGermany().getIsChanged());
        context.setVariable("purpose_of_stay_in_Germany_changed",
                userDataRequestDto.getPurposeOfStayInGermany().getIsChanged());

        if (userDataRequestDto.getPurposeOfStayInGermany().getIsChanged()) {
            context.setVariable("purpose_of_stay_in_Germany",
                    userDataRequestDto.getPurposeOfStayInGermany().getExplanation());
        }

        if (userDataRequestDto.getTrainingTypes() != null) {
            context.setVariable("training_studies",
                    userDataRequestDto.getTrainingTypes().equals(TrainingTypes.STUDIES));
            context.setVariable("training_school_attendance",
                    userDataRequestDto.getTrainingTypes().equals(TrainingTypes.SCHOOL_ATTENDANCE));
            context.setVariable("training_study_applicant",
                    userDataRequestDto.getTrainingTypes().equals(TrainingTypes.STUDY_APPLICANT));
            context.setVariable("training_passing_an_approval_test",
                    userDataRequestDto.getTrainingTypes().equals(TrainingTypes.PASSING_AN_APPROVAL_TEST));
            context.setVariable("training_language_course",
                    userDataRequestDto.getTrainingTypes().equals(TrainingTypes.LANGUAGE_COURSE_WITHOUT_STUDIES));
            context.setVariable("training_in_school",
                    userDataRequestDto.getTrainingTypes().equals(TrainingTypes.SCHOOL_TRAINING));
            context.setVariable("training_in_company",
                    userDataRequestDto.getTrainingTypes().equals(TrainingTypes.IN_COMPANY_TRAINING));
        }

        if (userDataRequestDto.getJobSeekingType() != null) {
            context.setVariable("job_seeking_after_completing_studies",
                    userDataRequestDto.getJobSeekingType().equals(JobSeekingType.AFTER_COMPLETING_STUDIES));
            context.setVariable("job_seeking_after_training_in_school",
                    userDataRequestDto.getJobSeekingType().equals(JobSeekingType.AFTER_SCHOOL_TRAINING));
            context.setVariable("job_seeking_after_training_in_company",
                    userDataRequestDto.getJobSeekingType().equals(JobSeekingType.AFTER_IN_COMPANY_TRAINING));
            context.setVariable("job_seeking_to_recognize_qualification_acquired_abroad",
                    userDataRequestDto.getJobSeekingType().equals(JobSeekingType.TO_RECOGNISE_QUALIFICATION_ACQUIRED_ABROAD));
            context.setVariable("job_seeking_after_recognition_qualification_acquired_abroad",
                    userDataRequestDto.getJobSeekingType().equals(JobSeekingType.AFTER_RECOGNITION_OF_QUALIFICATION_ACQUIRED_ABROAD));
            context.setVariable("job_seeking_for_holders_of_university_degree",
                    userDataRequestDto.getJobSeekingType().equals(JobSeekingType.FOR_HOLDERS_OF_UNIVERSITY_DEGREE));
            context.setVariable("job_seeking_after_research",
                    userDataRequestDto.getJobSeekingType().equals(JobSeekingType.AFTER_RESEARCH));
        }

        context.setVariable("employer", userDataRequestDto.getEmployer());

        if (userDataRequestDto.getGainfulEmploymentType() != null) {
            context.setVariable("employment_highly_qualified_person",
                    userDataRequestDto.getGainfulEmploymentType().equals(GainfulEmploymentType.HIGHLY_QUALIFIED_PERSON));
            context.setVariable("employment_ict_card",
                    userDataRequestDto.getGainfulEmploymentType().equals(GainfulEmploymentType.ICT_CART));
            context.setVariable("employment_mobile_ict_card",
                    userDataRequestDto.getGainfulEmploymentType().equals(GainfulEmploymentType.MOBILE_ICT_CARD));
            context.setVariable("employment_short_term_mobility",
                    userDataRequestDto.getGainfulEmploymentType().equals(
                            GainfulEmploymentType.SHORT_TERM_MOBILITY_OF_INTERNALLY_TRANSFERRED_WORKERS));
            context.setVariable("employment_qualified_employment_with_vocational_training",
                    userDataRequestDto.getGainfulEmploymentType().equals(
                            GainfulEmploymentType.QUALIFIED_EMPLOYMENT_WITH_VOCATIONAL_TRAINING));
            context.setVariable("employment_qualified_employment_with_academic_training",
                    userDataRequestDto.getGainfulEmploymentType().equals(
                            GainfulEmploymentType.QUALIFIED_EMPLOYMENT_WITH_ACADEMIC_TRAINING));
            context.setVariable("employment_unqualified_employment",
                    userDataRequestDto.getGainfulEmploymentType().equals(GainfulEmploymentType.UNQUALIFIED_EMPLOYMENT));
            context.setVariable("employment_self_employed",
                    userDataRequestDto.getGainfulEmploymentType().equals(GainfulEmploymentType.SELF_EMPLOYED));
            context.setVariable("employment_research",
                    userDataRequestDto.getGainfulEmploymentType().equals(GainfulEmploymentType.RESEARCH));
            context.setVariable("employment_short_term_mobility_for_researchers",
                    userDataRequestDto.getGainfulEmploymentType().equals(
                            GainfulEmploymentType.SHORT_TERM_MOBILITY_FOR_RESEARCHERS));
            context.setVariable("employment_in_another_member_state_as_internationally_protected_researcher",
                    userDataRequestDto.getGainfulEmploymentType().equals(
                            GainfulEmploymentType.IN_OTHER_MEMBER_STATE_AS_INTERNATIONALLY_PROTECTED_RESEARCHER));
            context.setVariable("employment_for_qualified_tolerated_persons",
                    userDataRequestDto.getGainfulEmploymentType().equals(
                            GainfulEmploymentType.FOR_QUALIFIED_TOLERATED_PERSONS_FOR_PURPOSE_OF_EMPLOYMENT));
            context.setVariable("employment_for_holders_of_training_allowances",
                    userDataRequestDto.getGainfulEmploymentType().equals(
                            GainfulEmploymentType.FOR_HOLDERS_OF_TRAINING_ALLOWANCES_FOR_EMPLOYMENT_AFTER_COMPLETING_THEIR_TRAINING));
        }

        if (userDataRequestDto.getReasonsDefinedUnderInternationalLaw() != null) {
            context.setVariable("international_law_reasons_admission_from_foreign_country",
                    userDataRequestDto.getReasonsDefinedUnderInternationalLaw().equals(
                            ReasonsDefinedUnderInternationalLaw.ADMISSION_FROM_FOREIGN_COUNTRY));
            context.setVariable("international_law_reasons_refugee_status",
                    userDataRequestDto.getReasonsDefinedUnderInternationalLaw().equals(
                            ReasonsDefinedUnderInternationalLaw.REFUGEE_STATUS_OR_SUBSIDIARY_PROTECTION_TO_ART));
            context.setVariable("international_law_reasons_instruction_from_supreme_state_authority",
                    userDataRequestDto.getReasonsDefinedUnderInternationalLaw().equals(
                            ReasonsDefinedUnderInternationalLaw.INSTRUCTION_FROM_SUPREME_STATE_AUTHORITY));
            context.setVariable("international_law_reasons_deportation_ban",
                    userDataRequestDto.getReasonsDefinedUnderInternationalLaw().equals(
                            ReasonsDefinedUnderInternationalLaw.DEPORTATION_BAN));
            context.setVariable("international_law_reasons_decision_taken_under_hardship_clause",
                    userDataRequestDto.getReasonsDefinedUnderInternationalLaw().equals(
                            ReasonsDefinedUnderInternationalLaw.DECISION_TAKEN_UNDER_HARDSHIP_CLAUSE));
            context.setVariable("international_law_reasons_temporary_stay",
                    userDataRequestDto.getReasonsDefinedUnderInternationalLaw().equals(
                            ReasonsDefinedUnderInternationalLaw.TEMPORARY_STAY_FOR_URGENT_HUMANITATIAN_REASONS));
            context.setVariable("international_law_reasons_temporary_protection",
                    userDataRequestDto.getReasonsDefinedUnderInternationalLaw().equals(
                            ReasonsDefinedUnderInternationalLaw.TEMPORARY_PROTECTION_AS_CIVIL_WAR_REFUGEE));
            context.setVariable("international_law_reasons_not_possible_to_leave_for_legal_reasons",
                    userDataRequestDto.getReasonsDefinedUnderInternationalLaw().equals(
                            ReasonsDefinedUnderInternationalLaw.NOT_POSSIBLE_TO_LEAVE_FOR_LEGAL_OR_ACTUAL_REASONS));
            context.setVariable("international_law_reasons_entitled_to_be_granted_asylum",
                    userDataRequestDto.getReasonsDefinedUnderInternationalLaw().equals(
                            ReasonsDefinedUnderInternationalLaw.ENTITLED_TO_BE_GRANTED_ASYLUM));
            context.setVariable("international_law_reasons_granting_of_well_integrated_youth",
                    userDataRequestDto.getReasonsDefinedUnderInternationalLaw().equals(
                            ReasonsDefinedUnderInternationalLaw.GRANTING_OF_WELL_INTEGRATED_YOUTH));
            context.setVariable("international_law_reasons_granting_of_residence_with_sustainable_integration",
                    userDataRequestDto.getReasonsDefinedUnderInternationalLaw().equals(
                            ReasonsDefinedUnderInternationalLaw.GRANTING_OF_RESIDENCE_WITH_SUSTAINABLE_INTEGRATION));
        }

        if (userDataRequestDto.getApplicationForExhibitionType() != null) {
            context.setVariable("application_for_exhibition_travel_document_for_refugees",
                    userDataRequestDto.getApplicationForExhibitionType().equals(
                            ApplicationForExhibitionType.TRAVEL_ID_FOR_REFUGEES));
            context.setVariable("application_for_exhibition_travel_document_for_foreigners",
                    userDataRequestDto.getApplicationForExhibitionType().equals(
                            ApplicationForExhibitionType.TRAVEL_ID_FOR_FOREIGNERS));
            context.setVariable("application_for_exhibition_as_replacement_id_card",
                    userDataRequestDto.getApplicationForExhibitionType().equals(
                            ApplicationForExhibitionType.ID_CARD_REPLACEMENT));
            context.setVariable("application_for_exhibition_reason",
                    userDataRequestDto.getApplicationForExhibitionsReason());
        }

        if (userDataRequestDto.getFamilyReasonType() != null) {
            context.setVariable("family_reasons_to_join_German_partner",
                    userDataRequestDto.getFamilyReasonType().equals(FamilyReasonType.TO_JOIN_GERMAN_PARTNER));
            context.setVariable("family_reasons_to_join_German_parents",
                    userDataRequestDto.getFamilyReasonType().equals(FamilyReasonType.TO_JOIN_GERMAN_PARENTS));
            context.setVariable("family_reasons_to_join_other_family_member",
                    userDataRequestDto.getFamilyReasonType().equals(FamilyReasonType.TO_JOIN_OTHER_FAMILY_MEMBERS));
            context.setVariable("family_reasons_to_join_non_German_partner",
                    userDataRequestDto.getFamilyReasonType().equals(FamilyReasonType.TO_JOIN_NON_GERMAN_PARTNER));
            context.setVariable("family_reasons_to_join_non_German_parent",
                    userDataRequestDto.getFamilyReasonType().equals(FamilyReasonType.TO_JOIN_NON_GERMAN_PARENTS));
        }

        if (userDataRequestDto.getSpecialResidenceRightsType() != null) {
            context.setVariable("special_residence_rights_right_to_return",
                    userDataRequestDto.getSpecialResidenceRightsType().equals(SpecialResidenceRightsType.RIGHT_TO_RETURN));
            context.setVariable("special_residence_rights_residence_title_for_former_Germans",
                    userDataRequestDto.getSpecialResidenceRightsType().equals(
                            SpecialResidenceRightsType.RESIDENCE_TITLE_FOR_FORMER_GERMANS));
            context.setVariable(
                    "special_residence_rights_residence_permit_for_someone_entitled_to_long_term_residence_in_other_EU_member_states",
                    userDataRequestDto.getSpecialResidenceRightsType().equals(
                            SpecialResidenceRightsType.RESIDENCE_PERMIT_FOR_SOMEONE_ENTITLED_TO_LONG_TERM_RESIDENCE_IN_OTHER_EU_MEMBER_STATES));
        }

        context.setVariable("means_of_support", userDataRequestDto.getMeansOfSupport());
        context.setVariable("get_benefits_no", !userDataRequestDto.getNeedsBenefitsUnderSocialLaw());
        context.setVariable("get_benefits_yes", userDataRequestDto.getNeedsBenefitsUnderSocialLaw());

        if (userDataRequestDto.getNeedsBenefitsUnderSocialLaw()) {
            context.setVariable("benefits_social_welfare_benefits",
                    userDataRequestDto.getBenefitsUnderSocialLaw().equals(
                            BenefitsUnderSocialLaw.SOCIAL_WELFARE_BENEFIT));
            context.setVariable("benefits_basic_support_for_employment_seekers",
                    userDataRequestDto.getBenefitsUnderSocialLaw().equals(
                            BenefitsUnderSocialLaw.BASIC_SUPPORT_FOR_EMPLOYMENT_SEEKERS));
        }

        context.setVariable("insurance_no", !userDataRequestDto.getHealthInsuranceInfo().getHasHealthInsurance());
        context.setVariable("insurance_yes", userDataRequestDto.getHealthInsuranceInfo().getHasHealthInsurance());

        if (userDataRequestDto.getHealthInsuranceInfo().getHasHealthInsurance()) {
            context.setVariable("insurer", userDataRequestDto.getHealthInsuranceInfo().getInsurer());
        }

        context.setVariable("violating_law_no",
                !userDataRequestDto.getOffencesInfo().getHaveBeenConvictedForViolatingLaw());
        context.setVariable("violating_law_yes",
                userDataRequestDto.getOffencesInfo().getHaveBeenConvictedForViolatingLaw());

        if (userDataRequestDto.getOffencesInfo().getHaveBeenConvictedForViolatingLaw()) {
            context.setVariable("violating_law_in_Germany",
                    userDataRequestDto.getOffencesInfo().getViolatingLocation().equals(Location.IN_GERMANY));
            context.setVariable("violating_law_abroad",
                    userDataRequestDto.getOffencesInfo().getViolatingLocation().equals(Location.ABROAD));
            context.setVariable("violating_law_reason", userDataRequestDto.getOffencesInfo().getReason());
            context.setVariable("violating_law_type_of_conviction",
                    userDataRequestDto.getOffencesInfo().getTypeOfConviction());
        }

        context.setVariable("under_investigation_no",
                !userDataRequestDto.getOffencesInfo().getUnderInvestigation());
        context.setVariable("under_investigation_yes",
                userDataRequestDto.getOffencesInfo().getUnderInvestigation());

        if (userDataRequestDto.getOffencesInfo().getUnderInvestigation()) {
            context.setVariable("under_investigation_in_Germany",
                    userDataRequestDto.getOffencesInfo().getInvestigationLocation().equals(Location.IN_GERMANY));
            context.setVariable("under_investigation_abroad",
                    userDataRequestDto.getOffencesInfo().getInvestigationLocation().equals(Location.ABROAD));
            context.setVariable("investigating_authority",
                    userDataRequestDto.getOffencesInfo().getInvestigationAuthority());
        }

        context.setVariable("deportation_no", !userDataRequestDto.getOffencesInfo().getHaveBeenDeported());
        context.setVariable("deportation_yes", userDataRequestDto.getOffencesInfo().getHaveBeenDeported());

        if (userDataRequestDto.getOffencesInfo().getHaveBeenDeported()) {
            context.setVariable("deportation_from", userDataRequestDto.getOffencesInfo().getDeportedFrom());
            context.setVariable("deportation_on", userDataRequestDto.getOffencesInfo().getDeportedDate());
        }

        context.setVariable("entry_application_rejected_no",
                !userDataRequestDto.getOffencesInfo().getHasEntryApplicationBeenRejected());
        context.setVariable("entry_application_rejected_yes",
                userDataRequestDto.getOffencesInfo().getHasEntryApplicationBeenRejected());

        if (userDataRequestDto.getOffencesInfo().getHasEntryApplicationBeenRejected()) {
            context.setVariable("entry_application_rejected_from",
                    userDataRequestDto.getOffencesInfo().getEntryApplicationRejectedFrom());
            context.setVariable("entry_application_rejected_on",
                    userDataRequestDto.getOffencesInfo().getEntryApplicationRejectedDate());
        }

        context.setVariable("application_for_residence_title_rejected_no",
                !userDataRequestDto.getOffencesInfo().getHasResidenceApplicationBeenRejected());
        context.setVariable("application_for_residence_title_rejected_yes",
                userDataRequestDto.getOffencesInfo().getHasResidenceApplicationBeenRejected());

        if (userDataRequestDto.getOffencesInfo().getHasResidenceApplicationBeenRejected()) {
            context.setVariable("application_for_residence_title_rejected_from",
                    userDataRequestDto.getOffencesInfo().getResidenceApplicationRejectedFrom());
            context.setVariable("application_for_residence_title_rejected_on",
                    userDataRequestDto.getOffencesInfo().getResidenceApplicationRejectedDate());
        }

        if (userDataRequestDto.getResidencePermitValidity() != null) {
            if (userDataRequestDto.getResidencePermitValidity().getDays() != null) {
                context.setVariable("residence_permit_for_days",
                        userDataRequestDto.getResidencePermitValidity().getDays());
            }
            if (userDataRequestDto.getResidencePermitValidity().getMonths() != null) {
                context.setVariable("residence_permit_for_months",
                        userDataRequestDto.getResidencePermitValidity().getMonths());
            }
            if (userDataRequestDto.getResidencePermitValidity().getYears() != null) {
                context.setVariable("residence_permit_for_years",
                        userDataRequestDto.getResidencePermitValidity().getYears());
            }
        }

        context.setVariable("application_place_date", userDataRequestDto.getApplicationPlace() == null
                ? LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE)
                : userDataRequestDto.getApplicationPlace() + ", " +
                LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE));

        return templateEngine.process("form_template", context);
    }

    private String processWithOCR(MultipartFile file, String pathToFile) throws IOException, InterruptedException {
        byte[] imageBytes = file.getBytes();

        // Encode the image data in Base64
        String encodedImage = Base64.getEncoder().encodeToString(imageBytes);

        ProcessBuilder processBuilder = new ProcessBuilder("python3", pathToFile);
        processBuilder.environment().put("IMAGE_DATA", encodedImage);
        processBuilder.redirectErrorStream(true);

        Process process = processBuilder.start();
        process.waitFor();

        InputStream inputStream = process.getInputStream();
        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
        String line = reader.readLine();

        if (line.startsWith("Traceback")) {
            throw new InvalidDataException("Image processing with OCR was failed with exception: " +
                    String.join("\n", reader.lines().collect(Collectors.toSet())));
        }

        return line;
    }

    private void mergePdf(ByteArrayOutputStream outputStream, MultipartFile[] documents) {
        String pdfFilePath = "src/main/resources/user_form.pdf";

        try {
            addImageToEndOfPDF(outputStream, documents, pdfFilePath);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void addImageToEndOfPDF(ByteArrayOutputStream outputStream, MultipartFile[] documents,
                                    String outputFilePath)
            throws IOException {
        Set<PDDocument> openDocuments = Sets.newHashSet();
        try (PDDocument document = PDDocument.load(outputStream.toByteArray())) {
            for (MultipartFile d : documents) {
                // Check the file type
                String contentType = d.getContentType();
                if (contentType != null && contentType.equals("application/pdf")) {
                    // If the file is a PDF, merge its content with the current document
                    PDDocument pdfDocument = PDDocument.load(d.getInputStream());
                    openDocuments.add(pdfDocument);
                    for (PDPage pdfPage : pdfDocument.getPages()) {
                        document.addPage(pdfPage);
                    }
                } else {
                    PDPage page = new PDPage();
                    document.addPage(page);
                    // If the file is an image, add it to the current page
                    PDImageXObject imageXObject = LosslessFactory.createFromImage(document,
                            ImageIO.read(d.getInputStream()));

                    PDRectangle pageSize = page.getMediaBox();
                    try (PDPageContentStream contentStream = new PDPageContentStream(document, page,
                            PDPageContentStream.AppendMode.APPEND, true)) {
                        float x = 100; // X-coordinate
                        float y = 100; // Y-coordinate
                        float width = pageSize.getWidth() - 200; // Width
                        float height = 200; // Height

                        contentStream.drawImage(imageXObject, x, y, width, height);
                    }
                }
            }
            document.save(outputFilePath);
        }
        for (PDDocument openDocument : openDocuments) {
            openDocument.close();
        }
    }

    private void addHandprintedSignatureToPDF(String filePath, MultipartFile signatureImageFile) throws IOException {
        try (PDDocument document = PDDocument.load(new File(filePath))) {
            PDPage page = document.getPage(6); // Assuming the signature is added to the first page

            // Load the handprinted signature image
            BufferedImage signatureImage = ImageIO.read(signatureImageFile.getInputStream());

            // Remove the background
            BufferedImage transparentImage = removeBackground(signatureImage);

            // Calculate the position and size of the signature
            float xPosition = 300; // Adjust the X position
            float yPosition = 570; // Adjust the Y position
            float imageWidth = 40; // Adjust the image width
            float imageHeight = (imageWidth / transparentImage.getWidth()) * transparentImage.getHeight();

            try (PDPageContentStream contentStream = new PDPageContentStream(document, page, PDPageContentStream.AppendMode.APPEND, true, true)) {
                // Convert BufferedImage to PDImageXObject
                PDImageXObject pdImage = LosslessFactory.createFromImage(document, transparentImage);

                // Draw the transparent image on the PDF
                contentStream.drawImage(pdImage, xPosition, yPosition, imageWidth, imageHeight);
            }

            document.save(filePath);
        }
    }

    private BufferedImage removeBackground(BufferedImage inputImage) {
        int width = inputImage.getWidth();
        int height = inputImage.getHeight();

        BufferedImage resultImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);

        // Determine the background color from the corners of the image
        Color backgroundColor = new Color(inputImage.getRGB(0, 0), true);

        for (int x = 0; x < width; x++) {
            for (int y = 0; y < height; y++) {
                Color pixelColor = new Color(inputImage.getRGB(x, y), true);

                // Check if the pixel color is close to the background color
                if (isSimilarColor(pixelColor, backgroundColor)) {
                    // Set the alpha value to 0 (transparent) for background pixels
                    resultImage.setRGB(x, y, new Color(0, 0, 0, 0).getRGB());
                } else {
                    // Copy non-background pixels as they are
                    resultImage.setRGB(x, y, pixelColor.getRGB());
                }
            }
        }

        return resultImage;
    }

    private static boolean isSimilarColor(Color color1, Color color2) {
        int redDiff = Math.abs(color1.getRed() - color2.getRed());
        int greenDiff = Math.abs(color1.getGreen() - color2.getGreen());
        int blueDiff = Math.abs(color1.getBlue() - color2.getBlue());

        return redDiff <= 30 && greenDiff <= 30 && blueDiff <= 30;
    }

    private void sendEmail(String filepath) {
        // Sender's email address
        String fromEmail = "test@gmail.com";
        // Sender's email password
        String password = "password";
        // Recipient's email address
        String toEmail = "abhmail@gmail.com";
        // Path to the file you want to attach
        String attachmentPath = filepath;

        // Setup properties for the SMTP server
        Properties props = new Properties();
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "465");
        props.put("mail.smtp.ssl.enable", "true");
        props.put("mail.smtp.auth", "true");

        // Create a Session object with authentication
        Session session = Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(fromEmail, password);
            }
        });

        try {
            // Create a MimeMessage object
            Message message = new MimeMessage(session);
            // Set the sender's email address
            message.setFrom(new InternetAddress(fromEmail));
            // Set the recipient's email address
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));
            // Set the email subject
            message.setSubject("Hello, this is a test email with attachment from Java!");

            // Create a multipart message
            Multipart multipart = new MimeMultipart();

            // Text part of the email
            MimeBodyPart textPart = new MimeBodyPart();
            textPart.setText("Dear User,\n\nThis is a test email with attachment sent from Java.");

            // Attach the text part to the multipart message
            multipart.addBodyPart(textPart);

            // Attachment part
            MimeBodyPart attachmentPart = new MimeBodyPart();
            DataSource source = new FileDataSource(attachmentPath);
            attachmentPart.setDataHandler(new DataHandler(source));
            attachmentPart.setFileName("user_form.pdf"); // set the name for the attachment

            // Attach the attachment part to the multipart message
            multipart.addBodyPart(attachmentPart);

            // Set the multipart content for the email message
            message.setContent(multipart);

            // Send the email
            Transport.send(message);

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

}
