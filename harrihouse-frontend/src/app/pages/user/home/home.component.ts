// src/app/pages/user/home/home.component.ts
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatInputModule
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
  
  // Active floor and image indices
  activeFloor = 'ground';
  activeImageIndex = 0;
  
  // For newsletter subscription
  newsletterEmail = '';
  
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Initialize any data needed for the component
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
    // Implementation would trigger the Material datepicker to open
    // For example, if using a template reference: this.datepickerRef.open();
  }

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

  // METODO MANCANTE: setActiveImage
  setActiveImage(index: number): void {
    this.propertyImages[this.activeImageIndex].active = false;
    this.activeImageIndex = index;
    this.propertyImages[this.activeImageIndex].active = true;
  }

  // METODO MANCANTE: setActiveFloor (era chiamato changeFloor nel codice originale)
  setActiveFloor(floor: string): void {
    this.activeFloor = floor;
    // Additional logic to update floor plans or related content
  }

  // Mantengo anche il nome originale per compatibilità (può essere rimosso se non necessario)
  changeFloor(floor: string): void {
    this.setActiveFloor(floor);
  }

  // Subscribe to newsletter
  subscribeToNewsletter(): void {
    if (this.validateEmail(this.newsletterEmail)) {
      console.log(`Subscribing email: ${this.newsletterEmail}`);
      // Here you would typically call a service to handle the subscription
      
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

  // Initialize scroll animations
  private initScrollAnimations(): void {
    // Implementation for any scroll-based animations
    // This could use Intersection Observer API or scroll event listeners
    
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

  // Quick booking with default options - senza riferimenti a bookingService
  quickBook(): void {
    const defaultBooking = {
      checkIn: new Date(), // Today
      checkOut: new Date(new Date().setDate(new Date().getDate() + 7)), // 1 week stay
      guests: 2,
      specialRequests: ''
    };
    
    console.log('Quick booking with default options:', defaultBooking);
    this.router.navigate(['/booking/confirm']);
  }

  // Handle contact form submission
  submitContactForm(form: any): void {
    if (form.valid) {
      console.log('Contact form submitted', form.value);
      // Call service to send contact form data
      
      // Reset form and show confirmation
      form.reset();
      alert('Thank you for your message. We will get back to you soon!');
    }
  }
}