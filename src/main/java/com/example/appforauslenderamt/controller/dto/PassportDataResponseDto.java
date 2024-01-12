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
public class PassportDataResponseDto {

    @JsonProperty("family_name")
    String familyName;
    @JsonProperty("first_name")
    String firstName;
    @JsonProperty("nationality")
    String nationality;
    @JsonProperty("date_of_birth")
    String dateOfBirth;
    @JsonProperty("sex")
    String sex;
    @JsonProperty("start_date")
    String startDate;

}
