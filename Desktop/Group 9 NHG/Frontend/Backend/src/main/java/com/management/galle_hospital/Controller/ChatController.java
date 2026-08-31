package com.management.galle_hospital.Controller;

import com.management.galle_hospital.Payload.ChatRequest;
import com.management.galle_hospital.Payload.ChatResponse;
import com.management.galle_hospital.Service.OpenAiChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {
    private final OpenAiChatService openAiChatService;

    @PostMapping
    public ResponseEntity<ChatResponse> chat(@RequestBody ChatRequest request) {
        return ResponseEntity.ok(openAiChatService.chat(request));
    }
}
