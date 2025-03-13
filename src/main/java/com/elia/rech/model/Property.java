package com.elia.rech.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "property")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(length = 2000)
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

    @Column(length = 5000)
    private String houseRules;

    @Column(length = 5000)
    private String checkInInstructions;

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PropertyImage> images = new ArrayList<>();
}