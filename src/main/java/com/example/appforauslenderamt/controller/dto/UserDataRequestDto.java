package com.example.appforauslenderamt.controller.dto;

import com.example.appforauslenderamt.entity.*;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Value;

@Value
@Builder
@Getter
public class UserDataRequestDto {

    @JsonProperty("personal_data")
    UserPersonalData personalData;

    @JsonCreator
    public UserDataRequestDto(@JsonProperty("personal_data") UserPersonalData personalData,
                              @JsonProperty("height") String height,
                              @JsonProperty("mobile_number") String mobileNumber,
                              @JsonProperty("email") String email,
                              @JsonProperty("passport_number") String passportNumber,
                              @JsonProperty("valid_from") String validFrom,
                              @JsonProperty("valid_till") String validTill) {
        this.personalData = personalData;
        this.height = height;
        this.mobileNumber = mobileNumber;
        this.email = email;
        this.passportNumber = passportNumber;
        this.validFrom = validFrom;
        this.validTill = validTill;
    }
//    MaritalStatus maritalStatus;
//    ColourOfEyes colourOfEyes;
    @JsonProperty("height")
    String height;
    @JsonProperty("mobile_number")
    String mobileNumber; //add validation
    @JsonProperty("email")
    String email; //add validation
//    String passportType;
    @JsonProperty("passport_number")
    String passportNumber;
    @JsonProperty("valid_from")
    String validFrom;
    @JsonProperty("valid_till")
    String validTill;
//    String issuedBy;
//    String issuedOn;
//    String placeOfResidence;
//    PlaceOfResidenceInGermany placeOfResidenceInGermany;
//    Boolean previousStaysInGermany;
//    //missed info about previous stay in Germany and place of residence abroad
//    UserPersonalData partnerPersonalData;
//    Set<UserPersonalData> childrenPersonalData;
//    UserPersonalData motherPersonalInfo;
//    UserPersonalData fatherPersonalData;

}
