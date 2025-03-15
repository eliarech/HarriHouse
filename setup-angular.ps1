# Script PowerShell per generare un progetto Angular per HarriHouse

# Verifica se Angular CLI è installato
$angularInstalled = npm list -g @angular/cli
if ($angularInstalled -match "empty") {
    Write-Host "Installazione di Angular CLI..." -ForegroundColor Yellow
    npm install -g @angular/cli
} else {
    Write-Host "Angular CLI già installato" -ForegroundColor Green
}

# Crea il progetto Angular
Write-Host "Creazione del progetto Angular 'harrihouse-frontend'..." -ForegroundColor Yellow
ng new harrihouse-frontend --routing --style=scss

# Entra nella directory del progetto
Set-Location -Path .\harrihouse-frontend

# Installa dipendenze utili
Write-Host "Installazione delle dipendenze..." -ForegroundColor Yellow
npm install @angular/material @angular/cdk
npm install bootstrap @ng-bootstrap/ng-bootstrap
npm install @fullcalendar/angular @fullcalendar/core @fullcalendar/daygrid
npm install jwt-decode

# Genera componenti per il layout
Write-Host "Generazione dei componenti di layout..." -ForegroundColor Yellow
ng generate component components/layout/header
ng generate component components/layout/footer
ng generate component components/layout/sidebar

# Genera pagine principali
Write-Host "Generazione delle pagine principali..." -ForegroundColor Yellow
ng generate component pages/home
ng generate component pages/property-detail
ng generate component pages/booking
ng generate component pages/booking-confirmation
ng generate component pages/availability-calendar
ng generate component pages/contact

# Genera pagine amministrative
Write-Host "Generazione delle pagine amministrative..." -ForegroundColor Yellow
ng generate component pages/admin/dashboard
ng generate component pages/admin/bookings
ng generate component pages/admin/property
ng generate component pages/admin/availability
ng generate component pages/admin/messages

# Genera servizi
Write-Host "Generazione dei servizi..." -ForegroundColor Yellow
ng generate service services/auth
ng generate service services/property
ng generate service services/booking
ng generate service services/availability
ng generate service services/contact
ng generate service services/token-interceptor

# Genera guardie per le route
Write-Host "Generazione delle guardie..." -ForegroundColor Yellow
ng generate guard guards/auth
ng generate guard guards/admin

# Genera un modulo Material per centrare tutte le importazioni di Angular Material
Write-Host "Generazione del modulo Material..." -ForegroundColor Yellow
ng generate module material

# Crea la cartella environments se non esiste
if (-Not (Test-Path -Path .\src\environments)) {
    New-Item -ItemType Directory -Path .\src\environments
}

# Crea il file di configurazione dell'ambiente
$environmentContent = @"
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
"@
Set-Content -Path .\src\environments\environment.ts -Value $environmentContent

$environmentProdContent = @"
export const environment = {
  production: true,
  apiUrl: '/api'
};
"@
Set-Content -Path .\src\environments\environment.prod.ts -Value $environmentProdContent

Write-Host "Setup completato! Il progetto Angular per HarriHouse è pronto." -ForegroundColor Green
Write-Host "Per avviare il server di sviluppo, esegui: ng serve" -ForegroundColor Cyan