package com.example.goodagiota.clients;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Mono;
import com.example.goodagiota.dtos.currencyClient.ConversionData;
import com.example.goodagiota.dtos.currencyClient.GetCurrencyConversionResponse;

@Component
public class CurrencyClient {
    private final WebClient currencyApiClient;

    public CurrencyClient(WebClient currencyApiClient) {
        this.currencyApiClient = currencyApiClient;
    }

    public List<ConversionData> getCurrencyConversion(String coinCode) {
        Date today = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
        String formattedDate = dateFormat.format(today);

        String responseFormat = "json";
        String select = "cotacaoVenda";

        return currencyApiClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/CotacaoMoedaAberturaOuIntermediario(codigoMoeda=@codigoMoeda,dataCotacao=@dataCotacao)")
                        .queryParam("@codigoMoeda", "'" + coinCode + "'")
                        .queryParam("@dataCotacao", "'" + formattedDate + "'")
                        .queryParam("$format", responseFormat)
                        .queryParam("$select", select).build())
                .retrieve()
                .onStatus(
                        status -> status.is4xxClientError(),
                        resp -> Mono.error(new RuntimeException("Erro 4xx: " + resp.statusCode())))
                .onStatus(
                        status -> status.is5xxServerError(),
                        resp -> Mono.error(new RuntimeException("Erro 5xx: " + resp.statusCode())))
                .bodyToMono(GetCurrencyConversionResponse.class)
                .block().getValue();
    }
}