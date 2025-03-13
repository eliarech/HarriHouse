package com.elia.rech.repository;

import com.elia.rech.model.Booking;
import com.elia.rech.model.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    Optional<Booking> findByIdAndConfirmationCode(Long id, String confirmationCode);

    List<Booking> findByStatus(BookingStatus status);

    @Query("SELECT b FROM Booking b WHERE b.status = 'CONFIRMED' AND " +
            "((b.checkInDate <= :checkOut AND b.checkOutDate >= :checkIn))")
    List<Booking> findOverlappingBookings(@Param("checkIn") LocalDate checkIn,
                                          @Param("checkOut") LocalDate checkOut);
}