package com.example.goodagiota.dtos.currencyClient;

import java.util.List;

public class GetCurrencyConversionResponse{
    private List<ConversionData> value;

    public List<ConversionData> getValue() {
        return value;
    }

    public void setValue(List<ConversionData> value) {
        this.value = value;
    }
}
