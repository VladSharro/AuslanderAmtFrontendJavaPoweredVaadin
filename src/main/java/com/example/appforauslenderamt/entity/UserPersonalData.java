package com.example.appforauslenderamt.entity;

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
public class UserPersonalData {

    @JsonProperty("family_name")
    String familyName;
//    Set<String> previousNames;
    @JsonProperty("first_name")
    String firstName;
    @JsonProperty("date_of_birth")
    String dateOfBirth; //maybe should be not String
    @JsonProperty("place_of_birth")
    String placeOfBirth;
    @JsonProperty("nationalities")
    Set<String> nationalities;
    @JsonProperty("sex")
    Sex sex;
//    PlaceOfResidenceInGermany placeOfResidenceInGermany;

}
