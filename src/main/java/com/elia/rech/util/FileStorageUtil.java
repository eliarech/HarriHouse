package com.elia.rech.util;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Component
public class FileStorageUtil {

    private final Path fileStorageLocation;

    @Value("${app.base-url}")
    private String baseUrl;

    public FileStorageUtil(@Value("${file.upload-dir}") String uploadDir) {
        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (IOException ex) {
            throw new RuntimeException("Impossibile creare la directory per il caricamento dei file", ex);
        }
    }

    public String storeFile(MultipartFile file) {
        try {
            if (file.isEmpty()) {
                throw new RuntimeException("Impossibile memorizzare un file vuoto");
            }

            // Genera un nome file univoco
            String originalFilename = file.getOriginalFilename();
            String extension = FilenameUtils.getExtension(originalFilename);
            String newFilename = UUID.randomUUID().toString() + "." + extension;

            Path targetLocation = this.fileStorageLocation.resolve(newFilename);

            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, targetLocation, StandardCopyOption.REPLACE_EXISTING);
            }

            // Restituisce l'URL relativo del file
            return "/uploads/" + newFilename;
        } catch (IOException ex) {
            throw new RuntimeException("Impossibile memorizzare il file " + file.getOriginalFilename(), ex);
        }
    }

    public boolean deleteFile(String fileUrl) {
        try {
            String filename = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
            Path filePath = this.fileStorageLocation.resolve(filename);
            return Files.deleteIfExists(filePath);
        } catch (IOException ex) {
            throw new RuntimeException("Impossibile eliminare il file " + fileUrl, ex);
        }
    }
}