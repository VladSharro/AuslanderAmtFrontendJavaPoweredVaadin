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
public class FinancialDocumentResponseDto {

    @JsonProperty("sum")
    String sum;
    @JsonProperty("date")
    String date;

}
