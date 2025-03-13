package com.elia.rech.controller;

import com.elia.rech.dto.BookingDTO;
import com.elia.rech.dto.BookingRequestDTO;
import com.elia.rech.model.BookingStatus;
import com.elia.rech.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    /**
     * Richiedi una prenotazione (accesso pubblico)
     */
    @PostMapping("/request")
    public ResponseEntity<BookingDTO> requestBooking(@Valid @RequestBody BookingRequestDTO bookingRequest) {
        return ResponseEntity.ok(bookingService.createBooking(bookingRequest));
    }

    /**
     * Ottieni una prenotazione con codice di conferma (accesso pubblico)
     */
    @GetMapping("/{id}")
    public ResponseEntity<BookingDTO> getBooking(
            @PathVariable Long id,
            @RequestParam String confirmationCode) {
        return ResponseEntity.ok(bookingService.findByIdAndCode(id, confirmationCode));
    }

    /**
     * Ottieni tutte le prenotazioni (solo admin)
     */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<BookingDTO>> getAllBookings(
            @RequestParam(required = false) BookingStatus status) {
        return ResponseEntity.ok(bookingService.findAllBookings(status));
    }

    /**
     * Conferma una prenotazione (solo admin)
     */
    @PutMapping("/{id}/confirm")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BookingDTO> confirmBooking(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.confirmBooking(id));
    }

    /**
     * Rifiuta una prenotazione (solo admin)
     */
    @PutMapping("/{id}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BookingDTO> rejectBooking(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.rejectBooking(id));
    }

    /**
     * Cancella una prenotazione (cliente con codice)
     */
    @PutMapping("/{id}/cancel")
    public ResponseEntity<BookingDTO> cancelBooking(
            @PathVariable Long id,
            @RequestParam String confirmationCode) {
        return ResponseEntity.ok(bookingService.cancelBooking(id, confirmationCode));
    }
}