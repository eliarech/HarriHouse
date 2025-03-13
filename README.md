# HarriHouse - Sistema di Gestione per Casa in Affitto

HarriHouse è un'applicazione web completa per la gestione di una casa in affitto, che permette di mostrare dettagli della proprietà, gestire prenotazioni, disponibilità e contatti. Il sistema è costruito con Spring Boot per il backend e può essere facilmente integrato con un frontend Angular.

## Tecnologie Utilizzate

- **Backend**: Java 21, Spring Boot 3.2.4
- **Database**: MySQL 8.0
- **Sicurezza**: Spring Security con JWT
- **Documentazione API**: Swagger/OpenAPI
- **Containerizzazione**: Docker e Docker Compose
- **Email**: Java Mail con template HTML

## Funzionalità Principali

- **Gestione della Proprietà**: 
  - Dettagli proprietà 
  - Galleria immagini
  - Servizi disponibili

- **Sistema di Prenotazione**: 
  - Calendari disponibilità
  - Richieste di prenotazione
  - Conferma/rifiuto prenotazioni
  - Cancellazioni

- **Gestione Contatti**: 
  - Form di contatto
  - Notifiche email

- **Area Amministrativa**: 
  - Autenticazione sicura
  - Pannello di controllo
  - Gestione prenotazioni e disponibilità

## Struttura del Progetto

```
com.elia.rech
├── config                      # Configurazioni Spring
├── controller                  # Controller REST
├── dto                         # Data Transfer Objects
├── exception                   # Gestione eccezioni
├── mapper                      # Mapper DTO-Entity
├── model                       # Modelli/Entità
├── repository                  # Repository JPA
├── service                     # Servizi
└── util                        # Utilità
```

## Requisiti di Sistema

- Java 21
- Maven
- Docker e Docker Compose (per ambiente containerizzato)
- MySQL (se eseguito localmente)

## Configurazione e Avvio

### Avvio con Docker (Raccomandato)

1. Clona il repository:
   ```bash
   git clone https://github.com/tuousername/harrihouse.git
   cd harrihouse
   ```

2. Compila il progetto:
   ```bash
   mvn clean package -DskipTests
   ```

3. Avvia i container Docker:
   ```bash
   docker-compose up -d
   ```

4. Accedi all'applicazione su: http://localhost:8080/api
5. Accedi a PhpMyAdmin su: http://localhost:8081

### Avvio Locale

1. Assicurati di avere MySQL installato e in esecuzione
2. Crea un database chiamato `harrihouse_db`
3. Modifica `src/main/resources/application.properties` con le tue credenziali del database
4. Esegui il progetto:
   ```bash
   mvn spring-boot:run
   ```

### Accesso Admin

- **Username**: admin
- **Password**: admin

## Endpoint API

La documentazione completa delle API è disponibile all'indirizzo:
http://localhost:8080/api/swagger-ui.html quando l'applicazione è in esecuzione.

Principali endpoint:

- `GET /api/property` - Ottiene i dettagli della proprietà
- `GET /api/property/availability` - Controlla disponibilità
- `POST /api/bookings/request` - Richiedi una prenotazione
- `POST /api/contact` - Invia un messaggio di contatto

## Operazioni Docker Comuni

- **Visualizzare i log**: `docker-compose logs -f harrihouse-api`
- **Fermare i container**: `docker-compose down`
- **Ricostruire dopo modifiche**: `docker-compose build` seguito da `docker-compose up -d`
