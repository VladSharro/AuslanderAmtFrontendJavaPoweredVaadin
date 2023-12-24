package com.example.appforauslenderamt.service;

import com.example.appforauslenderamt.controller.dto.UserDataRequestDto;
import com.example.appforauslenderamt.entity.*;
import com.example.appforauslenderamt.exceptions.DataDoNotMatchWithPassportException;
import com.example.appforauslenderamt.exceptions.InvalidDataException;
import com.itextpdf.text.Document;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfImportedPage;
import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.XMLWorkerHelper;
import com.lowagie.text.DocumentException;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.fit.pdfdom.PDFDomTree;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;
import org.xhtmlrenderer.pdf.ITextRenderer;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Locale;

@Service
public class GenerateReportService {

    public void generatePdfFromHtml(UserDataRequestDto userDataRequestDto, MultipartFile passportImage)
            throws IOException, DocumentException,
            InterruptedException {
        checkUserDataWithPassport(userDataRequestDto, passportImage);
        String html = parseThymeleafTemplate(userDataRequestDto);
        String outputFolder = "src/main/resources/user_form.pdf";
        OutputStream outputStream = new FileOutputStream(outputFolder);

        ITextRenderer renderer = new ITextRenderer();
        renderer.setDocumentFromString(html);
        renderer.layout();
        renderer.createPDF(outputStream);

        outputStream.close();
        mergePdf(passportImage);
    }

    private String parseThymeleafTemplate(UserDataRequestDto userDataRequestDto) {
        if (userDataRequestDto.getChildrenPersonalData().size() > 3) {
            throw new InvalidDataException("Information about more than 3 children cannot be entered in form");
        }

        ClassLoaderTemplateResolver templateResolver = new ClassLoaderTemplateResolver();
        templateResolver.setSuffix(".html");
        templateResolver.setTemplateMode(TemplateMode.HTML);

        TemplateEngine templateEngine = new TemplateEngine();
        templateEngine.setTemplateResolver(templateResolver);

        Context context = new Context();
        context.setVariable("family_name", userDataRequestDto.getPersonalData().getFamilyName() + " " +
                String.join(", ", userDataRequestDto.getPersonalData().getPreviousNames()));
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
        context.setVariable("previous_stay_in_Germany_from",
                userDataRequestDto.getPreviousStaysInGermany().getFromDate());
        context.setVariable("previous_stay_in_Germany_to",
                userDataRequestDto.getPreviousStaysInGermany().getToDate());
        context.setVariable("previous_stay_in_German_place", userDataRequestDto.getPreviousStaysInGermany());
        context.setVariable("place_of_residence_abroad_retained",
                userDataRequestDto.getIsPlaceOfResidenceAbroadRetains());
        context.setVariable("place_of_residence_abroad_not_retained",
                !userDataRequestDto.getIsPlaceOfResidenceAbroadRetains());

        if (userDataRequestDto.getIsPlaceOfResidenceAbroadRetains()) {
            context.setVariable("place_of_residence_abroad", userDataRequestDto.getPlaceOfResidenceAbroad());
        }

        context.setVariable("partner_family_name",
                userDataRequestDto.getPartnerPersonalData().getFamilyName() + " " +
                String.join(", ", userDataRequestDto.getPartnerPersonalData().getPreviousNames()));
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

        for (int i = 0; i < userDataRequestDto.getChildrenPersonalData().size(); i++) {
            context.setVariable(String.format("child%d_family_name", i + 1),
                    userDataRequestDto.getChildrenPersonalData().get(i).getFamilyName() + " " +
                    String.join(", ", userDataRequestDto.getChildrenPersonalData().get(i).getPreviousNames()));
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

        context.setVariable("father_family_name",
                userDataRequestDto.getFatherPersonalData().getFamilyName() + " " +
                String.join(", ", userDataRequestDto.getFatherPersonalData().getPreviousNames()));
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
        context.setVariable("mother_family_name",
                userDataRequestDto.getMotherPersonalData().getFamilyName() + " " +
                String.join(", ", userDataRequestDto.getMotherPersonalData().getPreviousNames()));
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
        context.setVariable("employer", userDataRequestDto.getEmployer());
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
        context.setVariable("special_residence_rights_right_to_return",
                userDataRequestDto.getSpecialResidenceRightsType().equals(SpecialResidenceRightsType.RIGHT_TO_RETURN));
        context.setVariable("special_residence_rights_residence_title_for_former_Germans",
                userDataRequestDto.getSpecialResidenceRightsType().equals(
                        SpecialResidenceRightsType.RESIDENCE_TITLE_FOR_FORMER_GERMANS));
        context.setVariable(
                "special_residence_rights_residence_permit_for_someone_entitled_to_long_term_residence_in_other_EU_member_states",
                userDataRequestDto.getSpecialResidenceRightsType().equals(
                        SpecialResidenceRightsType.RESIDENCE_PERMIT_FOR_SOMEONE_ENTITLED_TO_LONG_TERM_RESIDENCE_IN_OTHER_EU_MEMBER_STATES));
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

        return templateEngine.process("form_template", context);
    }

    private void generateHTMLFromPDF(String filename) throws IOException {
        PDDocument pdf = PDDocument.load(new File(filename));
        PDFDomTree parser = new PDFDomTree();
        Writer output = new PrintWriter("src/main/resources/form_template.html", StandardCharsets.UTF_8);
        parser.writeText(pdf, output);
        output.close();
        if (pdf != null) {
            pdf.close();
        }
    }

    private void generatePDFFromHTML(String filename) throws IOException, com.itextpdf.text.DocumentException {
        Document document = new Document();
        PdfWriter writer = PdfWriter.getInstance(document,
                new FileOutputStream("src/main/resources/form_template.html"));
        document.open();
        XMLWorkerHelper.getInstance().parseXHtml(writer, document, new FileInputStream(filename));
        document.close();
    }

    public void checkUserDataWithPassport(UserDataRequestDto userData, MultipartFile passportImage)
            throws IOException, InterruptedException {
        byte[] imageBytes = passportImage.getBytes();

        // Encode the image data in Base64
        String encodedImage = Base64.getEncoder().encodeToString(imageBytes);

        ProcessBuilder processBuilder = new ProcessBuilder("python3", "src/main/resources/passport_analys.py");
        processBuilder.environment().put("IMAGE_DATA", encodedImage);
        processBuilder.redirectErrorStream(true);

        Process process = processBuilder.start();
        process.waitFor();

        InputStream inputStream = process.getInputStream();
        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
        String line = reader.readLine();
        // Process line of the output here
        String[] familyNameAndFirstName = line.split(" ");

        if (!userData.getPersonalData().getFamilyName().toLowerCase(Locale.ROOT)
                .equals(familyNameAndFirstName[0].toLowerCase(Locale.ROOT)) ||
                !userData.getPersonalData().getFirstName().toLowerCase(Locale.ROOT)
                        .equals(familyNameAndFirstName[1].toLowerCase(Locale.ROOT))) {
            throw new DataDoNotMatchWithPassportException("Family name or first name doesn't match with passport data");
        }

        process.waitFor(); // Wait for the process to finish

    }

    private void mergePdf(MultipartFile passportImage) {
        try {
            Document document = new Document();
            PdfWriter writer = PdfWriter.getInstance(document,
                    new FileOutputStream("src/main/resources/final_document.pdf"));
            document.open();
            PdfContentByte contentByte = writer.getDirectContent();

            // Add PDF file
            PdfReader pdfReader = new PdfReader("src/main/resources/user_form.pdf");
            int numPages = pdfReader.getNumberOfPages();
            for (int pageNum = 1; pageNum <= numPages; pageNum++) {
                PdfImportedPage page = writer.getImportedPage(pdfReader, pageNum);
                document.newPage();
                contentByte.addTemplate(page, 0, 0);
            }

            // Add JPG file
            Image jpgImage = Image.getInstance(passportImage.getBytes());
            document.newPage();
            jpgImage.setAbsolutePosition(0, 0);
            jpgImage.scaleToFit(PageSize.A4);
            contentByte.addImage(jpgImage);

            document.close();
            writer.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
