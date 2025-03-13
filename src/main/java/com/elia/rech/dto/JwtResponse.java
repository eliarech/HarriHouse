package com.elia.rech.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponse {

    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String name;

    public JwtResponse(String token, Long id, String username, String name) {
        this.token = token;
        this.id = id;
        this.username = username;
        this.name = name;
    }
}