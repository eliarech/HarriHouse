package com.elia.rech.repository;

import com.elia.rech.model.Availability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AvailabilityRepository extends JpaRepository<Availability, Long> {

    List<Availability> findByDateBetweenOrderByDateAsc(LocalDate startDate, LocalDate endDate);

    Availability findByDate(LocalDate date);
}