package com.elia.rech.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequestDTO {

    @NotNull(message = "Data di check-in obbligatoria")
    @Future(message = "La data di check-in deve essere nel futuro")
    private LocalDate checkInDate;

    @NotNull(message = "Data di check-out obbligatoria")
    @Future(message = "La data di check-out deve essere nel futuro")
    private LocalDate checkOutDate;

    @NotNull(message = "Numero di ospiti obbligatorio")
    private Integer numberOfGuests;

    @NotEmpty(message = "Nome dell'ospite obbligatorio")
    private String guestName;

    @NotEmpty(message = "Email dell'ospite obbligatoria")
    @Email(message = "Formato email non valido")
    private String guestEmail;

    private String guestPhone;

    private String specialRequests;
}