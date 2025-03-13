package com.elia.rech.service;

import com.elia.rech.dto.BookingDTO;
import com.elia.rech.dto.BookingRequestDTO;
import com.elia.rech.exception.ResourceNotFoundException;
import com.elia.rech.mapper.BookingMapper;
import com.elia.rech.model.Booking;
import com.elia.rech.model.BookingStatus;
import com.elia.rech.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final BookingMapper bookingMapper;
    private final AvailabilityService availabilityService;
    private final EmailService emailService;

    /**
     * Crea una nuova richiesta di prenotazione
     */
    @Transactional
    public BookingDTO createBooking(BookingRequestDTO requestDTO) {
        LocalDate checkInDate = requestDTO.getCheckInDate();
        LocalDate checkOutDate = requestDTO.getCheckOutDate();

        // Verifica se le date sono disponibili
        if (!availabilityService.isDateRangeAvailable(checkInDate, checkOutDate)) {
            throw new IllegalArgumentException("Le date selezionate non sono disponibili");
        }

        // Converti DTO in entità
        Booking booking = bookingMapper.fromRequestDto(requestDTO);

        // Genera codice di conferma
        booking.setConfirmationCode(generateConfirmationCode());

        // Imposta lo stato
        booking.setStatus(BookingStatus.PENDING);

        // Calcola il prezzo totale
        BigDecimal totalPrice = availabilityService.calculateTotalPrice(
                checkInDate, checkOutDate, requestDTO.getNumberOfGuests());
        booking.setTotalPrice(totalPrice);

        // Salva la prenotazione
        Booking savedBooking = bookingRepository.save(booking);

        // Invia email di conferma
        emailService.sendBookingConfirmationEmail(savedBooking);

        return bookingMapper.toDto(savedBooking);
    }

    /**
     * Recupera una prenotazione per ID e codice di conferma
     */
    public BookingDTO findByIdAndCode(Long id, String confirmationCode) {
        Booking booking = bookingRepository.findByIdAndConfirmationCode(id, confirmationCode)
                .orElseThrow(() -> new ResourceNotFoundException("Prenotazione non trovata"));

        return bookingMapper.toDto(booking);
    }

    /**
     * Recupera tutte le prenotazioni (per admin)
     */
    public List<BookingDTO> findAllBookings(BookingStatus status) {
        List<Booking> bookings;

        if (status != null) {
            bookings = bookingRepository.findByStatus(status);
        } else {
            bookings = bookingRepository.findAll();
        }

        return bookings.stream()
                .map(bookingMapper::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Conferma una prenotazione (admin)
     */
    @Transactional
    public BookingDTO confirmBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Prenotazione non trovata"));

        booking.setStatus(BookingStatus.CONFIRMED);
        Booking updatedBooking = bookingRepository.save(booking);

        // Invia email di conferma
        emailService.sendBookingStatusUpdateEmail(updatedBooking);

        return bookingMapper.toDto(updatedBooking);
    }

    /**
     * Rifiuta una prenotazione (admin)
     */
    @Transactional
    public BookingDTO rejectBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Prenotazione non trovata"));

        booking.setStatus(BookingStatus.REJECTED);
        Booking updatedBooking = bookingRepository.save(booking);

        // Invia email di notifica rifiuto
        emailService.sendBookingStatusUpdateEmail(updatedBooking);

        return bookingMapper.toDto(updatedBooking);
    }

    /**
     * Cancella una prenotazione (cliente)
     */
    @Transactional
    public BookingDTO cancelBooking(Long id, String confirmationCode) {
        Booking booking = bookingRepository.findByIdAndConfirmationCode(id, confirmationCode)
                .orElseThrow(() -> new ResourceNotFoundException("Prenotazione non trovata"));

        // Verifica se è possibile cancellare (ad esempio, se non è troppo vicino alla data)
        LocalDate today = LocalDate.now();
        if (booking.getCheckInDate().minusDays(3).isBefore(today)) {
            throw new IllegalStateException("Non è possibile cancellare prenotazioni a meno di 3 giorni dall'arrivo");
        }

        booking.setStatus(BookingStatus.CANCELLED);
        Booking updatedBooking = bookingRepository.save(booking);

        // Invia email di conferma cancellazione
        emailService.sendBookingCancellationEmail(updatedBooking);

        return bookingMapper.toDto(updatedBooking);
    }

    /**
     * Genera un codice di conferma univoco
     */
    private String generateConfirmationCode() {
        return UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}