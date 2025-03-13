package com.elia.rech.repository;

import com.elia.rech.model.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {

    List<ContactMessage> findByIsReadOrderByCreatedAtDesc(Boolean isRead);

    List<ContactMessage> findAllByOrderByCreatedAtDesc();
}