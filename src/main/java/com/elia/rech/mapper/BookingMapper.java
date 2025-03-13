package com.elia.rech.mapper;

import com.elia.rech.dto.BookingDTO;
import com.elia.rech.dto.BookingRequestDTO;
import com.elia.rech.model.Booking;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BookingMapper {

    BookingDTO toDto(Booking booking);

    Booking toEntity(BookingDTO dto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "confirmationCode", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "totalPrice", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Booking fromRequestDto(BookingRequestDTO requestDTO);
}