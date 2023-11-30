package com.example.appforauslenderamt.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Value;

@Value
@Builder
@Getter
@AllArgsConstructor
public class PreviousStaysInGermany {

    @JsonProperty("from_date")
    String from_Date;
    @JsonProperty("to_date")
    String toDate;
    @JsonProperty("place")
    String place;
    @JsonProperty("distrinct")
    String district;
    @JsonProperty("state")
    String state;
    @JsonProperty("land")
    String land;

}
