package com.elia.rech.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PropertyImageDTO {

    private Long id;
    private String imageUrl;
    private String caption;
    private Integer displayOrder;
}