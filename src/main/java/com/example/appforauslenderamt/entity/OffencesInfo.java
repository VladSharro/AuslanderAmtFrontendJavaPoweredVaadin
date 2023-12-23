package com.example.appforauslenderamt.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class OffencesInfo {

    @JsonProperty("have_been_convicted_for_violating_law")
    Boolean haveBeenConvictedForViolatingLaw;
    @JsonProperty("violating_location")
    Location violatingLocation;
    @JsonProperty("reason")
    String reason;
    @JsonProperty("type_of_conviction")
    String typeOfConviction;
    @JsonProperty("under_investigation")
    Boolean underInvestigation;
    @JsonProperty("investigation_location")
    Location investigationLocation;
    @JsonProperty("investigation_authority")
    String investigationAuthority;
    @JsonProperty("have_been_deported")
    Boolean haveBeenDeported;
    @JsonProperty("deported_from")
    String deportedFrom;
    @JsonProperty("deportation_date")
    String deportedDate;
    @JsonProperty("has_entry_application_been_rejected")
    Boolean hasEntryApplicationBeenRejected;
    @JsonProperty("entry_application_rejected_from")
    String entryApplicationRejectedFrom;
    @JsonProperty("entry_application_rejected_date")
    String entryApplicationRejectedDate;
    @JsonProperty("has_residence_application_been_rejected")
    Boolean hasResidenceApplicationBeenRejected;
    @JsonProperty("residence_application_rejected_from")
    String residenceApplicationRejectedFrom;
    @JsonProperty("residence_application_rejected_date")
    String residenceApplicationRejectedDate;

}
