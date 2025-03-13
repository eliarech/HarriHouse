package com.elia.rech.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PropertyDTO {

    private Long id;
    private String name;
    private String description;
    private String address;
    private String city;
    private String postalCode;
    private String country;
    private Integer maxGuests;
    private Integer bedrooms;
    private Integer bathrooms;
    private BigDecimal pricePerNight;
    private BigDecimal cleaningFee;
    private Boolean hasWifi;
    private Boolean hasParking;
    private Boolean hasAirConditioning;
    private Boolean hasHeating;
    private String houseRules;
    private String checkInInstructions;
    private List<PropertyImageDTO> images = new ArrayList<>();
}