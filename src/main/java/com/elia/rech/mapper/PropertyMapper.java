package com.elia.rech.mapper;

import com.elia.rech.dto.PropertyDTO;
import com.elia.rech.model.Property;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = PropertyImageMapper.class)
public interface PropertyMapper {

    PropertyDTO toDto(Property property);

    @Mapping(target = "images", ignore = true)
    Property toEntity(PropertyDTO propertyDTO);
}