package com.example.appforauslenderamt.entity;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class PlaceOfResidenceInGermany {

    String postalCode;
    String place;
    String street;
    Integer houseNumber;

}
