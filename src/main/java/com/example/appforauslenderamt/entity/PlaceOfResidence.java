package com.example.appforauslenderamt.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class PlaceOfResidence {

    @JsonProperty("postal_code")
    private final String postalCode;
    @JsonProperty("place")
    private final String place;
    @JsonProperty("street")
    private final String street;
    @JsonProperty("house_number")
    private final Integer houseNumber;

    @Override
    public String toString() {
        return postalCode + ", " + place + ", " + street + ", " + houseNumber;
    }
}
