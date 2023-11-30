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
public class HealthInsuranceInfo {
    @JsonProperty("has_health_insurance")
    Boolean hasHealthInsurance;
    @JsonProperty("insurer")
    String insurer;
}
