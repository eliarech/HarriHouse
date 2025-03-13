package com.elia.rech.mapper;

import com.elia.rech.dto.ContactMessageDTO;
import com.elia.rech.model.ContactMessage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ContactMessageMapper {

    ContactMessageDTO toDto(ContactMessage contactMessage);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "isRead", ignore = true)
    ContactMessage toEntity(ContactMessageDTO dto);
}