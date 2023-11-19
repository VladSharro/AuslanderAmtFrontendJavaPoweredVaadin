package com.example.appforauslenderamt.controller.dto;

import com.example.appforauslenderamt.entity.*;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Value;

import java.util.Set;

@Value
@Builder
@Getter
@AllArgsConstructor
public class UserDataRequestDto {

    @JsonProperty("personal_data")
    UserPersonalData personalData;
    @JsonProperty("marital_status")
    MaritalStatus maritalStatus;
    @JsonProperty("marital_status_since")
    String maritalStatusSince;
    @JsonProperty("colour_of_eyes")
    ColourOfEyes colourOfEyes;
    @JsonProperty("height")
    String height;
    @JsonProperty("mobile_number")
    String mobileNumber; //add validation
    @JsonProperty("email")
    String email; //add validation
    @JsonProperty("passport_type")
    String passportType;
    @JsonProperty("passport_number")
    String passportNumber;
    @JsonProperty("valid_from")
    String validFrom;
    @JsonProperty("valid_till")
    String validTill;
    @JsonProperty("issued_by")
    String issuedBy;
    @JsonProperty("issued_on")
    String issuedOn;
    @JsonProperty("is_previous_stays_in_Germany")
    Boolean isPreviousStaysInGermany;
    @JsonProperty("previous_stays_in_Germany")
    PreviousStaysInGermany previousStaysInGermany;
    @JsonProperty("is_place_of_residence_abroad_retains")
    Boolean isPlaceOfResidenceAbroadRetains;
    @JsonProperty("place_of_residence_abroad")
    PlaceOfResidenceAbroad placeOfResidenceAbroad;
    @JsonProperty("partner_personal_data")
    UserPersonalData partnerPersonalData;
    @JsonProperty("children_personal_data")
    Set<UserPersonalData> childrenPersonalData;
    @JsonProperty("mother_personal_data")
    UserPersonalData motherPersonalData;
    @JsonProperty("father_personal_data")
    UserPersonalData fatherPersonalData;
    @JsonProperty("purpose_of_stay_in_Germany")
    PurposeOfStayInGermany purposeOfStayInGermany;
    @JsonProperty("training_type")
    TrainingTypes trainingTypes;
    @JsonProperty("job_seeking_type")
    JobSeekingType jobSeekingType;
    @JsonProperty("employer")
    String employer;
    @JsonProperty("gainful_employment")
    GainfulEmploymentType gainfulEmploymentType;
    @JsonProperty("reasons_defined_under_international_law")
    ReasonsDefinedUnderInternationalLaw reasonsDefinedUnderInternationalLaw;
    @JsonProperty("application_for_exhibitions_type")
    ApplicationForExhibitionType applicationForExhibitionType;
    @JsonProperty("application_for_exhibitions_reason")
    String applicationForExhibitionsReason;
    @JsonProperty("family_reason")
    FamilyReasonType familyReasonType;
    @JsonProperty("special_residence_right")
    SpecialResidenceRightsType specialResidenceRightsType;
    @JsonProperty("means_of_support")
    String meansOfSupport;
    @JsonProperty("needs_benefit_under_social_law")
    Boolean needsBenefitsUnderSocialLaw;
    @JsonProperty("benefit_under_social_law")
    BenefitsUnderSocialLaw benefitsUnderSocialLaw;
    @JsonProperty("health_insurance_info")
    HealthInsuranceInfo healthInsuranceInfo;
    @JsonProperty("offences_info")
    OffencesInfo offencesInfo;

}
