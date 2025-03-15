// app.component.ts - Main component where you'll import your booking flow
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/user/home/home.component';
// Importa solo i componenti che esistono realmente, commenta gli altri per ora
// import { BookingFormComponent } from './components/booking-form/booking-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HomeComponent,
    // BookingFormComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent { }