package com.elia.rech.service;

import com.elia.rech.dto.ContactMessageDTO;
import com.elia.rech.exception.ResourceNotFoundException;
import com.elia.rech.mapper.ContactMessageMapper;
import com.elia.rech.model.ContactMessage;
import com.elia.rech.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactMessageRepository contactMessageRepository;
    private final ContactMessageMapper contactMessageMapper;
    private final EmailService emailService;

    /**
     * Salva un nuovo messaggio di contatto
     */
    @Transactional
    public ContactMessageDTO saveContactMessage(ContactMessageDTO contactMessageDTO) {
        ContactMessage contactMessage = contactMessageMapper.toEntity(contactMessageDTO);
        contactMessage.setIsRead(false);

        ContactMessage savedMessage = contactMessageRepository.save(contactMessage);

        // Invia notifica email all'amministratore
        emailService.sendContactNotificationEmail(contactMessageMapper.toDto(savedMessage));

        return contactMessageMapper.toDto(savedMessage);
    }

    /**
     * Ottiene tutti i messaggi (solo admin)
     */
    public List<ContactMessageDTO> getAllMessages() {
        List<ContactMessage> messages = contactMessageRepository.findAllByOrderByCreatedAtDesc();

        return messages.stream()
                .map(contactMessageMapper::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Ottiene i messaggi non letti (solo admin)
     */
    public List<ContactMessageDTO> getUnreadMessages() {
        List<ContactMessage> messages = contactMessageRepository.findByIsReadOrderByCreatedAtDesc(false);

        return messages.stream()
                .map(contactMessageMapper::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Marca un messaggio come letto (solo admin)
     */
    @Transactional
    public ContactMessageDTO markAsRead(Long id) {
        ContactMessage message = contactMessageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Messaggio non trovato"));

        message.setIsRead(true);
        ContactMessage updatedMessage = contactMessageRepository.save(message);

        return contactMessageMapper.toDto(updatedMessage);
    }

    /**
     * Elimina un messaggio (solo admin)
     */
    @Transactional
    public void deleteMessage(Long id) {
        if (!contactMessageRepository.existsById(id)) {
            throw new ResourceNotFoundException("Messaggio non trovato");
        }

        contactMessageRepository.deleteById(id);
    }
}