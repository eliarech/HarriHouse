package com.elia.rech.service;

import com.elia.rech.dto.AvailabilityDTO;
import com.elia.rech.mapper.AvailabilityMapper;
import com.elia.rech.model.Availability;
import com.elia.rech.repository.AvailabilityRepository;
import com.elia.rech.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AvailabilityService {

    private final AvailabilityRepository availabilityRepository;
    private final BookingRepository bookingRepository;
    private final AvailabilityMapper availabilityMapper;

    /**
     * Ottiene la disponibilità per un intervallo di date
     */
    public List<AvailabilityDTO> getAvailability(LocalDate startDate, LocalDate endDate) {
        List<Availability> availabilities = availabilityRepository.findByDateBetweenOrderByDateAsc(startDate, endDate);

        // Se non ci sono record di disponibilità per alcune date, li creiamo con valori predefiniti
        LocalDate currentDate = startDate;
        while (!currentDate.isAfter(endDate)) {
            final LocalDate dateToCheck = currentDate;
            boolean dateExists = availabilities.stream()
                    .anyMatch(a -> a.getDate().equals(dateToCheck));

            if (!dateExists) {
                Availability defaultAvailability = createDefaultAvailability(currentDate);
                availabilities.add(defaultAvailability);
            }

            currentDate = currentDate.plusDays(1);
        }

        // Ordina per data
        availabilities.sort((a1, a2) -> a1.getDate().compareTo(a2.getDate()));

        return availabilities.stream()
                .map(availabilityMapper::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Aggiorna la disponibilità per più date
     */
    @Transactional
    public void updateAvailability(List<AvailabilityDTO> availabilityDTOs) {
        List<Availability> availabilities = availabilityDTOs.stream()
                .map(availabilityMapper::toEntity)
                .collect(Collectors.toList());

        availabilityRepository.saveAll(availabilities);
    }

    /**
     * Verifica se un intervallo di date è disponibile per la prenotazione
     */
    public boolean isDateRangeAvailable(LocalDate checkInDate, LocalDate checkOutDate) {
        // Verifica sovrapposizioni con prenotazioni confermate
        boolean hasBookingOverlap = !bookingRepository.findOverlappingBookings(checkInDate, checkOutDate).isEmpty();

        if (hasBookingOverlap) {
            return false;
        }

        // Verifica se tutte le date sono contrassegnate come disponibili
        List<Availability> availabilities = availabilityRepository.findByDateBetweenOrderByDateAsc(checkInDate, checkOutDate);

        // Per ogni data nel range
        LocalDate currentDate = checkInDate;
        while (!currentDate.isAfter(checkOutDate.minusDays(1))) {  // Il giorno di check-out non conta
            final LocalDate dateToCheck = currentDate;

            // Cerca la disponibilità per questa data
            boolean isAvailable = availabilities.stream()
                    .filter(a -> a.getDate().equals(dateToCheck))
                    .findFirst()
                    .map(Availability::getIsAvailable)
                    .orElse(true);  // Se non c'è record, assumiamo disponibile

            if (!isAvailable) {
                return false;
            }

            currentDate = currentDate.plusDays(1);
        }

        return true;
    }

    /**
     * Crea un record di disponibilità con valori predefiniti
     */
    private Availability createDefaultAvailability(LocalDate date) {
        Availability availability = new Availability();
        availability.setDate(date);
        availability.setIsAvailable(true);
        availability.setPrice(BigDecimal.valueOf(100.00)); // Prezzo di default, da modificare
        return availability;
    }

    /**
     * Calcola il prezzo totale per un intervallo di date
     */
    public BigDecimal calculateTotalPrice(LocalDate checkInDate, LocalDate checkOutDate, Integer numberOfGuests) {
        List<Availability> availabilities = availabilityRepository.findByDateBetweenOrderByDateAsc(checkInDate, checkOutDate.minusDays(1));

        BigDecimal basePrice = availabilities.stream()
                .map(Availability::getPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Se non ci sono prezzi personalizzati per alcune date, utilizziamo il prezzo di default
        long daysInRange = checkInDate.datesUntil(checkOutDate).count();
        if (availabilities.size() < daysInRange) {
            BigDecimal defaultPrice = BigDecimal.valueOf(100.00); // Prezzo di default, da modificare
            basePrice = basePrice.add(defaultPrice.multiply(BigDecimal.valueOf(daysInRange - availabilities.size())));
        }

        // Aggiungi supplemento per ospiti aggiuntivi (esempio)
        if (numberOfGuests > 2) {
            BigDecimal extraGuestFee = BigDecimal.valueOf(20.00); // Supplemento per ospite aggiuntivo
            BigDecimal extraGuestTotal = extraGuestFee.multiply(BigDecimal.valueOf(numberOfGuests - 2))
                    .multiply(BigDecimal.valueOf(daysInRange));
            basePrice = basePrice.add(extraGuestTotal);
        }

        // Aggiungi tassa di pulizia
        BigDecimal cleaningFee = BigDecimal.valueOf(50.00); // Tassa di pulizia, da modificare

        return basePrice.add(cleaningFee);
    }
}