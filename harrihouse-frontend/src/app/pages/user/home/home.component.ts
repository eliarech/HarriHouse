// src/app/pages/user/home/home.component.ts
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { RouterModule } from '@angular/router';

// Import BookingComponent
import { BookingComponent } from '../booking/booking.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatInputModule,
    RouterModule,
    BookingComponent // Add BookingComponent to imports
  ],
  providers: [
    provideNativeDateAdapter()
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  
  // Property images for the gallery
  propertyImages = [
    { src: 'assets/images/pic1.jpg', alt: 'Floor Plans', active: true },
    { src: 'assets/images/pic2.jpg', alt: 'Property View', active: false },
    { src: 'assets/images/pic3.jpg', alt: 'Living Room', active: false },
    { src: 'assets/images/pic4.jpg', alt: 'Dining Area', active: false },
    { src: 'assets/images/pic5.jpg', alt: 'Kitchen', active: false }
  ];
  
  // Properties for booking
  stepperStep = 1;
  checkInDate: Date | null = null;
  checkOutDate: Date | null = null;
  
  // Active image index
  activeImageIndex = 0;
  
  // For newsletter subscription
  newsletterEmail = '';
  
  // Selected number of guests
  selectedGuests = 1;
  
  constructor(private router: Router) {}

  ngOnInit(): void {
    // This can be empty if you don't need initialization logic
    // Or you can add code that should run when the component initializes
    
    // Optionally set default dates for the booking form
    // const today = new Date();
    // this.checkInDate = today;
    // const checkoutDate = new Date();
    // checkoutDate.setDate(today.getDate() + 5);
    // this.checkOutDate = checkoutDate;
  }

  ngAfterViewInit(): void {
    // Initialize animations after view is loaded
    this.initScrollAnimations();
  }
  
  // Start the booking process
  startBooking(): void {
    this.router.navigate(['/booking/dates']);
  }
  
  // Open date picker (this would connect to a Material date picker or custom implementation)
  openDatePicker(type: 'check-in' | 'check-out'): void {
    console.log(`Opening ${type} date picker`);
    // You would implement dialog opening here
    // For example, using MatDatepicker
  }
  
  // Update selected guests
  // Keeping this method commented out until needed
  /*
  updateGuests(guests: number): void {
    this.selectedGuests = guests;
  }
  */

  // Gallery navigation
  nextImage(): void {
    this.propertyImages[this.activeImageIndex].active = false;
    this.activeImageIndex = (this.activeImageIndex + 1) % this.propertyImages.length;
    this.propertyImages[this.activeImageIndex].active = true;
  }

  prevImage(): void {
    this.propertyImages[this.activeImageIndex].active = false;
    this.activeImageIndex = (this.activeImageIndex - 1 + this.propertyImages.length) % this.propertyImages.length;
    this.propertyImages[this.activeImageIndex].active = true;
  }

  // Set active image by index
  setActiveImage(index: number): void {
    this.propertyImages[this.activeImageIndex].active = false;
    this.activeImageIndex = index;
    this.propertyImages[this.activeImageIndex].active = true;
  }

  // Subscribe to newsletter
  subscribeToNewsletter(): void {
    if (this.validateEmail(this.newsletterEmail)) {
      console.log(`Subscribing email: ${this.newsletterEmail}`);
      // Reset the field after successful subscription
      this.newsletterEmail = '';
      // Show a success message to the user
      alert('Thank you for subscribing to our newsletter!');
    } else {
      alert('Please enter a valid email address');
    }
  }

  // Email validation helper
  private validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  openGuestsDropdown(): void {
    console.log('Opening guests dropdown');
    // Implement dropdown logic here
  }
  
  
  
  // Initialize scroll animations
  private initScrollAnimations(): void {
    // Implementation for any scroll-based animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    // Select all elements that should be animated on scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
  }
}