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
public class ResidencePermitValidity {

    @JsonProperty("days")
    Integer days;
    @JsonProperty("months")
    Integer months;
    @JsonProperty("years")
    Integer years;

}
