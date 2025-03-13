package com.elia.rech.mapper;

import com.elia.rech.dto.AvailabilityDTO;
import com.elia.rech.model.Availability;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AvailabilityMapper {

    AvailabilityDTO toDto(Availability availability);

    Availability toEntity(AvailabilityDTO dto);
}