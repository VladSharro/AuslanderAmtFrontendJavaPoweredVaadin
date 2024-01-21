package com.example.appforauslenderamt.controller.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Value;

@Value
@Builder
@Getter
@AllArgsConstructor
public class CertificateOfEnrollmentDataResponseDto {

    @JsonProperty("first_name")
    String firstName;
    @JsonProperty("family_name")
    String familyName;
    @JsonProperty("date_of_birth")
    String dateOfBirth;
    @JsonProperty("place_of_birth")
    String placeOfBirth;
    @JsonProperty("address")
    String address;
    @JsonProperty("semester_ends_date")
    String semesterEndsDate;

}
