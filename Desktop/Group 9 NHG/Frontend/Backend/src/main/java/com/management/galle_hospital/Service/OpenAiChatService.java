package com.management.galle_hospital.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.management.galle_hospital.Payload.ChatRequest;
import com.management.galle_hospital.Payload.ChatResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@Service
public class OpenAiChatService {
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final RestClient restClient = RestClient.builder()
            .baseUrl("https://api.openai.com/v1")
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .build();

    @Value("${openai.api-key:}")
    private String apiKey;

    @Value("${openai.model:gpt-5.6}")
    private String model;

    @Value("${openai.system-message:You are a helpful assistant for the Galle Hospital Management System. Give concise answers and do not provide medical diagnosis.}")
    private String defaultInstructions;

    public ChatResponse chat(ChatRequest request) {
        if (request == null || isBlank(request.getMessage())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Message is required");
        }
        if (isBlank(apiKey)) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "OpenAI API key is not configured");
        }

        try {
            String responseBody = restClient.post()
                    .uri("/responses")
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                    .body(Map.of(
                            "model", model,
                            "instructions", getInstructions(request),
                            "input", request.getMessage().trim()
                    ))
                    .retrieve()
                    .body(String.class);

            JsonNode response = objectMapper.readTree(responseBody);
            String reply = extractReply(response);
            if (isBlank(reply)) {
                throw new ResponseStatusException(HttpStatus.BAD_GATEWAY, "OpenAI response did not include text");
            }

            return new ChatResponse(reply, model);
        } catch (RestClientResponseException exception) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_GATEWAY,
                    "OpenAI request failed: " + extractOpenAiError(exception),
                    exception
            );
        } catch (Exception exception) {
            throw new ResponseStatusException(HttpStatus.BAD_GATEWAY, "Could not read OpenAI response", exception);
        }
    }

    private String getInstructions(ChatRequest request) {
        return isBlank(request.getInstructions()) ? defaultInstructions : request.getInstructions().trim();
    }

    private String extractReply(JsonNode response) {
        if (response == null) {
            return null;
        }

        String outputText = response.path("output_text").asText(null);
        if (!isBlank(outputText)) {
            return outputText;
        }

        JsonNode output = response.path("output");
        if (!output.isArray()) {
            return null;
        }

        StringBuilder builder = new StringBuilder();
        for (JsonNode item : output) {
            JsonNode content = item.path("content");
            if (!content.isArray()) {
                continue;
            }
            for (JsonNode contentItem : content) {
                String type = contentItem.path("type").asText();
                if ("output_text".equals(type) || "text".equals(type)) {
                    String text = contentItem.path("text").asText();
                    if (!isBlank(text)) {
                        builder.append(text);
                    }
                }
            }
        }
        return builder.toString();
    }

    private String extractOpenAiError(RestClientResponseException exception) {
        String body = exception.getResponseBodyAsString();
        if (isBlank(body)) {
            return exception.getStatusText();
        }

        try {
            JsonNode error = objectMapper.readTree(body)
                    .path("error")
                    .path("message");
            return error.isMissingNode() ? exception.getStatusText() : error.asText();
        } catch (Exception ignored) {
            return exception.getStatusText();
        }
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }
}
