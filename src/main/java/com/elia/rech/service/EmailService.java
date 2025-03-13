package com.elia.rech.service;

import com.elia.rech.dto.ContactMessageDTO;
import com.elia.rech.model.Booking;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;

    @Value("${spring.mail.username}")
    private String senderEmail;

    @Value("${app.admin.email}")
    private String adminEmail;

    @Value("${app.base-url}")
    private String baseUrl;

    /**
     * Invia email di conferma dopo la creazione di una prenotazione
     */
    @Async
    public void sendBookingConfirmationEmail(Booking booking) {
        String subject = "Conferma richiesta prenotazione - HarriHouse";
        String templateName = "booking-request-confirmation";

        Map<String, Object> templateVariables = new HashMap<>();
        templateVariables.put("booking", booking);
        templateVariables.put("baseUrl", baseUrl);

        sendHtmlEmail(booking.getGuestEmail(), subject, templateName, templateVariables);

        // Notifica anche l'admin
        sendHtmlEmail(adminEmail, "Nuova richiesta di prenotazione", "admin-booking-notification", templateVariables);
    }

    /**
     * Invia email di aggiornamento stato prenotazione
     */
    @Async
    public void sendBookingStatusUpdateEmail(Booking booking) {
        String templateName;
        String subject;

        if (booking.getStatus() == com.elia.rech.model.BookingStatus.CONFIRMED) {
            subject = "Prenotazione confermata - HarriHouse";
            templateName = "booking-confirmed";
        } else if (booking.getStatus() == com.elia.rech.model.BookingStatus.REJECTED) {
            subject = "Prenotazione non disponibile - HarriHouse";
            templateName = "booking-rejected";
        } else {
            return; // Non inviare email per altri stati
        }

        Map<String, Object> templateVariables = new HashMap<>();
        templateVariables.put("booking", booking);
        templateVariables.put("baseUrl", baseUrl);

        sendHtmlEmail(booking.getGuestEmail(), subject, templateName, templateVariables);
    }

    /**
     * Invia email di conferma cancellazione
     */
    @Async
    public void sendBookingCancellationEmail(Booking booking) {
        String subject = "Cancellazione prenotazione - HarriHouse";
        String templateName = "booking-cancelled";

        Map<String, Object> templateVariables = new HashMap<>();
        templateVariables.put("booking", booking);
        templateVariables.put("baseUrl", baseUrl);

        sendHtmlEmail(booking.getGuestEmail(), subject, templateName, templateVariables);

        // Notifica anche l'admin
        sendHtmlEmail(adminEmail, "Prenotazione cancellata", "admin-booking-cancellation", templateVariables);
    }

    /**
     * Invia notifica di nuovo messaggio di contatto
     */
    @Async
    public void sendContactNotificationEmail(ContactMessageDTO contactMessage) {
        String subject = "Nuovo messaggio di contatto - HarriHouse";
        String templateName = "contact-notification";

        Map<String, Object> templateVariables = new HashMap<>();
        templateVariables.put("contact", contactMessage);

        sendHtmlEmail(adminEmail, subject, templateName, templateVariables);
    }

    /**
     * Metodo generico per l'invio di email HTML con Thymeleaf
     */
    private void sendHtmlEmail(String to, String subject, String templateName, Map<String, Object> variables) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(senderEmail);
            helper.setTo(to);
            helper.setSubject(subject);

            Context context = new Context();
            context.setVariables(variables);

            String htmlContent = templateEngine.process(templateName, context);
            helper.setText(htmlContent, true);

            mailSender.send(message);
        } catch (MessagingException e) {
            // Log exception
            e.printStackTrace();
        }
    }
}