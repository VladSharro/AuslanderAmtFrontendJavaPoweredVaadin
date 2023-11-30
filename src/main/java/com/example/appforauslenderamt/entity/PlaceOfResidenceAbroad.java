package com.example.appforauslenderamt.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class PlaceOfResidenceAbroad extends PlaceOfResidence{

    @JsonProperty("country")
    private final String country;

    @JsonCreator
    public PlaceOfResidenceAbroad(String postalCode, String place, String street, Integer houseNumber, String country) {
        super(postalCode, place, street, houseNumber);
        this.country = country;
    }

}
