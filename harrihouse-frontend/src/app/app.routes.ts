// app.routes.ts - Set up your routing to handle the booking flow
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/user/home/home.component';

// Importa solo i componenti che hai già creato
// Per ora commentiamo le importazioni dei componenti che non esistono ancora
// import { BookingComponent } from './pages/user/booking/booking.component';
// import { GuestDetailsComponent } from './pages/user/booking/guest-details/guest-details.component';
// import { ContactInfoComponent } from './pages/user/booking/contact-info/contact-info.component';
// import { ReviewBookingComponent } from './pages/user/booking/review-booking/review-booking.component';
// import { BookingConfirmedComponent } from './pages/user/booking/booking-confirmed/booking-confirmed.component';
// import { BookingFormComponent } from './components/booking-form/booking-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  // Commenta temporaneamente le rotte per i componenti che non esistono ancora
  /*
  { path: 'booking', component: BookingComponent,
    children: [
      { path: '', redirectTo: 'dates', pathMatch: 'full' },
      { path: 'dates', component: BookingFormComponent },
      { path: 'guest-details', component: GuestDetailsComponent },
      { path: 'contact-info', component: ContactInfoComponent },
      { path: 'review', component: ReviewBookingComponent },
      { path: 'confirmed', component: BookingConfirmedComponent }
    ]
  },
  */
  { path: '**', redirectTo: '' }
];