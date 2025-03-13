package com.elia.rech.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContactMessageDTO {

    private Long id;

    @NotEmpty(message = "Il nome è obbligatorio")
    private String name;

    @NotEmpty(message = "L'email è obbligatoria")
    @Email(message = "Formato email non valido")
    private String email;

    private String phone;

    @NotEmpty(message = "Il messaggio è obbligatorio")
    private String message;

    private LocalDateTime createdAt;

    private Boolean isRead;
}