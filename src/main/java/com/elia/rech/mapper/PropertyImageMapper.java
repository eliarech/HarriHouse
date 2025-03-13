package com.elia.rech.mapper;

import com.elia.rech.dto.PropertyImageDTO;
import com.elia.rech.model.PropertyImage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PropertyImageMapper {

    @Mapping(target = "property", ignore = true)
    PropertyImage toEntity(PropertyImageDTO dto);

    PropertyImageDTO toDto(PropertyImage entity);
}