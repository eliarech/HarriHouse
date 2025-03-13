package com.elia.rech.controller;

import com.elia.rech.dto.ContactMessageDTO;
import com.elia.rech.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    /**
     * Invia un messaggio di contatto (accesso pubblico)
     */
    @PostMapping
    public ResponseEntity<ContactMessageDTO> sendContactMessage(@Valid @RequestBody ContactMessageDTO messageDTO) {
        return ResponseEntity.ok(contactService.saveContactMessage(messageDTO));
    }

    /**
     * Ottieni tutti i messaggi di contatto (solo admin)
     */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ContactMessageDTO>> getAllMessages() {
        return ResponseEntity.ok(contactService.getAllMessages());
    }

    /**
     * Ottieni messaggi non letti (solo admin)
     */
    @GetMapping("/unread")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ContactMessageDTO>> getUnreadMessages() {
        return ResponseEntity.ok(contactService.getUnreadMessages());
    }

    /**
     * Marca un messaggio come letto (solo admin)
     */
    @PutMapping("/{id}/read")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ContactMessageDTO> markAsRead(@PathVariable Long id) {
        return ResponseEntity.ok(contactService.markAsRead(id));
    }

    /**
     * Elimina un messaggio (solo admin)
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteMessage(@PathVariable Long id) {
        contactService.deleteMessage(id);
        return ResponseEntity.noContent().build();
    }
}