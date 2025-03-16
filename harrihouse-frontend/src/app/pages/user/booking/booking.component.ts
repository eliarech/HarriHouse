// src/app/booking/booking.component.ts
import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatOptionModule } from '@angular/material/core';

interface PropertyImage {
  src: string;
  alt: string;
  active: boolean;
}

type FloorKey = 'ground' | 'first' | 'second';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatSnackBarModule
  ],
  providers: [
    provideNativeDateAdapter()
  ],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit, OnDestroy {
  // Booking process step
  currentStep = 1;
  
  // Booking details
  checkInDate: Date | null = null;
  checkOutDate: Date | null = null;
  guestCount: number = 1;
  
  // Guest details
  fullName: string = '';
  email: string = '';
  phone: string = '';
  country: string = '';
  specialRequests: string = '';
  arrivalTime: string = '';
  occasion: string = '';
  
  // Marketing preferences
  marketingConsent: boolean = false;
  contactPreference: string = 'email';
  
  // Terms agreement
  termsAgreed: boolean = false;
  
  // Property details
  pricePerNight: number = 160;
  serviceFee: number = 0;
  totalPrice: number = 0;
  
  // Floor plans
  activeFloor: FloorKey = 'ground';
  floorType: FloorKey[] = ['ground', 'first', 'second'];
  
  // Property images for the gallery
  propertyImages: PropertyImage[] = [
    { src: 'assets/images/pic1.jpg', alt: 'Floor Plans', active: true },
    { src: 'assets/images/pic2.jpg', alt: 'Property View', active: false },
    { src: 'assets/images/pic3.jpg', alt: 'Living Room', active: false },
    { src: 'assets/images/pic4.jpg', alt: 'Dining Area', active: false },
    { src: 'assets/images/pic5.jpg', alt: 'Kitchen', active: false }
  ];
  activeImageIndex = 0;
  
  // Image slideshow timer
  private slideshowTimer: any;
  private readonly SLIDESHOW_INTERVAL = 5000; // 5 seconds
  
  // Countries mapping for display in summary
  countriesMap: { [key: string]: string } = {
    'FR': 'France',
    'DE': 'Germany',
    'GB': 'United Kingdom',
    'IT': 'Italy',
    'ES': 'Spain',
    'US': 'United States',
    'CA': 'Canada'
  };
  
  // Animation control
  private observer: IntersectionObserver | null = null;
  
  constructor(
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Initialize with default dates for demo
    const today = new Date();
    this.checkInDate = new Date(today);
    
    // Set checkout date to 5 days after checkin by default
    const checkoutDate = new Date(today);
    checkoutDate.setDate(today.getDate() + 5);
    this.checkOutDate = checkoutDate;
    
    this.updatePriceCalculation();
    this.startImageSlideshow();
    
    // Trigger animation for elements as they come into view
    this.initScrollAnimations();
    
    // Add initial animation to the container
    setTimeout(() => {
      const container = document.querySelector('.booking-card-container');
      if (container) {
        container.classList.add('animate-on-scroll');
      }
    }, 100);
  }
  
  ngOnDestroy(): void {
    this.stopImageSlideshow();
    
    // Clean up the observer
    if (this.observer) {
      this.observer.disconnect();
    }
  }
  
  // Initialize scroll-based animations with improved IntersectionObserver
  private initScrollAnimations(): void {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          this.observer?.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px' // Start animation slightly before element is in view
    });
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      this.observer?.observe(el);
    });
  }
  
  // Update step in the booking process with animated transition
  setStep(step: number): void {
    if (step >= 1 && step <= 4) {
      // Add transition class
      const contentElement = document.querySelector('.booking-steps-content');
      if (contentElement) {
        contentElement.classList.add('step-transition');
        
        // After transition completes, change step and remove transition class
        setTimeout(() => {
          this.currentStep = step;
          
          setTimeout(() => {
            contentElement.classList.remove('step-transition');
          }, 50);
          
          this.scrollToTop();
        }, 300);
      } else {
        this.currentStep = step;
        this.scrollToTop();
      }
    }
  }
  
  // Scroll to top of content area with smooth animation
  scrollToTop(): void {
    const contentElement = document.querySelector('.booking-steps-content');
    if (contentElement) {
      contentElement.scrollTop = 0;
    }
  }
  
  // Go to next step with validation and animated transition
  nextStep(): void {
    if (this.currentStep < 4) {
      // Validate current step before proceeding
      if (this.validateCurrentStep()) {
        // Add transition class
        const contentElement = document.querySelector('.booking-steps-content');
        if (contentElement) {
          contentElement.classList.add('step-transition');
          
          // After transition completes, increment step and remove transition class
          setTimeout(() => {
            this.currentStep++;
            
            setTimeout(() => {
              contentElement.classList.remove('step-transition');
            }, 50);
            
            this.scrollToTop();
          }, 300);
        } else {
          this.currentStep++;
          this.scrollToTop();
        }
      }
    }
  }
  
  // Go to previous step with animated transition
  prevStep(): void {
    if (this.currentStep > 1) {
      // Add transition class
      const contentElement = document.querySelector('.booking-steps-content');
      if (contentElement) {
        contentElement.classList.add('step-transition');
        
        // After transition completes, decrement step and remove transition class
        setTimeout(() => {
          this.currentStep--;
          
          setTimeout(() => {
            contentElement.classList.remove('step-transition');
          }, 50);
          
          this.scrollToTop();
        }, 300);
      } else {
        this.currentStep--;
        this.scrollToTop();
      }
    }
  }
  
  // Validate the current step before proceeding with enhanced feedback
  private validateCurrentStep(): boolean {
    switch (this.currentStep) {
      case 1: // Date selection
        if (!this.areDatesValid()) {
          this.showError('Please select valid check-in and check-out dates');
          this.highlightInvalidField('checkin-date');
          return false;
        }
        return true;
        
      case 2: // Guest details
        if (this.guestCount < 1) {
          this.showError('Please select the number of guests');
          this.highlightInvalidField('guest-count');
          return false;
        }
        return true;
        
      case 3: // Contact information
        if (!this.fullName) {
          this.showError('Please enter your full name');
          this.highlightInvalidField('full-name');
          return false;
        }
        
        if (!this.email) {
          this.showError('Please enter your email address');
          this.highlightInvalidField('email');
          return false;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.email)) {
          this.showError('Please enter a valid email address');
          this.highlightInvalidField('email');
          return false;
        }
        
        if (!this.phone) {
          this.showError('Please enter your phone number');
          this.highlightInvalidField('phone');
          return false;
        }
        
        if (!this.country) {
          this.showError('Please select your country');
          this.highlightInvalidField('country');
          return false;
        }
        
        return true;
        
      default:
        return true;
    }
  }
  
  // Highlight invalid field with visual feedback
  private highlightInvalidField(fieldId: string): void {
    const field = document.getElementById(fieldId);
    if (field) {
      field.classList.add('invalid-highlight');
      
      // Remove highlight after animation completes
      setTimeout(() => {
        field.classList.remove('invalid-highlight');
      }, 2000);
      
      // Focus the invalid field
      field.focus();
    }
  }
  
  // Display error message with enhanced styling
  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
  
  // Display success message with enhanced styling
  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['success-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
  
  // Start automatic image slideshow with improved transitions
  private startImageSlideshow(): void {
    this.slideshowTimer = setInterval(() => {
      this.nextImage();
    }, this.SLIDESHOW_INTERVAL);
  }
  
  // Stop the slideshow
  private stopImageSlideshow(): void {
    if (this.slideshowTimer) {
      clearInterval(this.slideshowTimer);
    }
  }
  
  // Temporarily pause slideshow when user interacts with gallery
  private pauseSlideshow(): void {
    this.stopImageSlideshow();
    setTimeout(() => {
      this.startImageSlideshow();
    }, this.SLIDESHOW_INTERVAL * 2); // Restart after double the interval
  }
  
  // Gallery navigation - Next image with smooth transition
  nextImage(): void {
    // Add transition class
    const imageContainer = document.querySelector('.image-scroll-container');
    if (imageContainer) {
      imageContainer.classList.add('image-transition');
      
      // After transition starts, change active image
      setTimeout(() => {
        this.propertyImages[this.activeImageIndex].active = false;
        this.activeImageIndex = (this.activeImageIndex + 1) % this.propertyImages.length;
        this.propertyImages[this.activeImageIndex].active = true;
        
        // Remove transition class after change completes
        setTimeout(() => {
          imageContainer.classList.remove('image-transition');
        }, 300);
      }, 200);
    } else {
      // Fallback if container not found
      this.propertyImages[this.activeImageIndex].active = false;
      this.activeImageIndex = (this.activeImageIndex + 1) % this.propertyImages.length;
      this.propertyImages[this.activeImageIndex].active = true;
    }
  }

  // Gallery navigation - Previous image with smooth transition
  prevImage(): void {
    this.pauseSlideshow();
    
    // Add transition class
    const imageContainer = document.querySelector('.image-scroll-container');
    if (imageContainer) {
      imageContainer.classList.add('image-transition');
      
      // After transition starts, change active image
      setTimeout(() => {
        this.propertyImages[this.activeImageIndex].active = false;
        this.activeImageIndex = (this.activeImageIndex - 1 + this.propertyImages.length) % this.propertyImages.length;
        this.propertyImages[this.activeImageIndex].active = true;
        
        // Remove transition class after change completes
        setTimeout(() => {
          imageContainer.classList.remove('image-transition');
        }, 300);
      }, 200);
    } else {
      // Fallback if container not found
      this.propertyImages[this.activeImageIndex].active = false;
      this.activeImageIndex = (this.activeImageIndex - 1 + this.propertyImages.length) % this.propertyImages.length;
      this.propertyImages[this.activeImageIndex].active = true;
    }
  }
  
  // Select image by index with smooth transition
  setActiveImage(index: number): void {
    this.pauseSlideshow();
    if (index >= 0 && index < this.propertyImages.length) {
      // Add transition class
      const imageContainer = document.querySelector('.image-scroll-container');
      if (imageContainer) {
        imageContainer.classList.add('image-transition');
        
        // After transition starts, change active image
        setTimeout(() => {
          this.propertyImages[this.activeImageIndex].active = false;
          this.activeImageIndex = index;
          this.propertyImages[this.activeImageIndex].active = true;
          
          // Remove transition class after change completes
          setTimeout(() => {
            imageContainer.classList.remove('image-transition');
          }, 300);
        }, 200);
      } else {
        // Fallback if container not found
        this.propertyImages[this.activeImageIndex].active = false;
        this.activeImageIndex = index;
        this.propertyImages[this.activeImageIndex].active = true;
      }
    }
  }
  
  // Calculate the number of nights
  get numberOfNights(): number {
    if (!this.checkInDate || !this.checkOutDate) {
      return 0;
    }
    
    const checkIn = new Date(this.checkInDate);
    const checkOut = new Date(this.checkOutDate);
    
    // Ensure checkout date is after checkin date
    if (checkOut <= checkIn) {
      return 0;
    }
    
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
  
  // Get cancellation policy date (7 days before check-in)
  getCancellationDate(): Date | null {
    if (!this.checkInDate) {
      return null;
    }
    
    const cancellationDate = new Date(this.checkInDate);
    cancellationDate.setDate(cancellationDate.getDate() - 7);
    return cancellationDate;
  }
  
  // Update price calculation with progressive service fee and improved guest factor
  updatePriceCalculation(): void {
    const nights = this.numberOfNights;
    const subtotal = this.pricePerNight * nights;
    
    // Progressive service fee - decreases for longer stays to incentivize longer bookings
    let feePercentage = 0.18; // Base percentage
    
    if (nights >= 14) {
      feePercentage = 0.15; // Lowest fee for stays of two weeks or more
    } else if (nights >= 7) {
      feePercentage = 0.16; // Lower fee for stays of a week or more
    } else if (nights >= 3) {
      feePercentage = 0.17; // Medium fee for stays of 3-6 nights
    }
    
    // Apply guest count factor - higher fee for more guests due to additional cleaning/utilities
    const guestFactor = 1 + (this.guestCount - 1) * 0.03; // 3% increase per additional guest
    
    // Calculate service fee with rounding to nearest whole number
    this.serviceFee = Math.round(subtotal * feePercentage * guestFactor);
    
    // Calculate total
    this.totalPrice = subtotal + this.serviceFee;
    
    // Apply occasional discount animations for marketing
    this.applyPriceAnimation();
  }
  
  // Apply animation to price when there's a good deal
  private applyPriceAnimation(): void {
    // Apply animation if stay is 7+ nights (weekly discount) or 3+ guests (group discount)
    if (this.numberOfNights >= 7 || this.guestCount >= 3) {
      const priceElement = document.querySelector('.price-amount');
      if (priceElement) {
        priceElement.classList.add('price-pulse');
        
        // Remove animation after it completes
        setTimeout(() => {
          priceElement.classList.remove('price-pulse');
        }, 2000);
      }
    }
  }
  
  // Handle date changes with improved validation
  onDateChange(): void {
    if (!this.checkInDate) {
      return;
    }
    
    // Set minimum checkout date to day after checkin
    const minCheckoutDate = new Date(this.checkInDate);
    minCheckoutDate.setDate(minCheckoutDate.getDate() + 1);
    
    // Ensure checkout date is after checkin date
    if (this.checkOutDate && this.checkOutDate < minCheckoutDate) {
      this.checkOutDate = minCheckoutDate;
    }
    
    this.updatePriceCalculation();
    
    // Update stay duration indicator visibility
    this.updateStayDurationIndicator();
  }
  
  // Update stay duration indicator visibility
  private updateStayDurationIndicator(): void {
    if (this.checkInDate && this.checkOutDate && this.numberOfNights > 0) {
      const indicator = document.querySelector('.stay-duration-indicator');
      if (indicator) {
        indicator.classList.add('visible');
      }
    }
  }
  
  // Check if dates are valid before proceeding with enhanced validation
  areDatesValid(): boolean {
    // Current date at midnight for comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return !!this.checkInDate && 
           !!this.checkOutDate && 
           this.numberOfNights > 0 &&
           new Date(this.checkInDate) >= today;
  }
  
  // Get country name from code for display
  getCountryName(code: string): string {
    return this.countriesMap[code] || code;
  }
  
  // Check if the user can proceed to the next step (for button enable/disable)
  canProceed(): boolean {
    switch (this.currentStep) {
      case 1: 
        return this.areDatesValid();
      case 2:
        return this.guestCount > 0;
      case 3:
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !!(this.fullName && this.email && emailRegex.test(this.email) && this.phone && this.country);
      case 4:
        return this.termsAgreed;
      default:
        return true;
    }
  }
  
  // Complete booking with enhanced animation and feedback
  completeBooking(): void {
    if (!this.termsAgreed) {
      this.showError('Please agree to the terms and conditions to complete your booking');
      this.highlightInvalidField('terms-agreement');
      return;
    }
    
    if (this.areDatesValid() && this.termsAgreed) {
      // Show loading state
      const bookingCard = document.querySelector('.booking-card');
      if (bookingCard) {
        bookingCard.classList.add('loading');
      }
      
      const booking = {
        checkIn: this.checkInDate,
        checkOut: this.checkOutDate,
        guests: this.guestCount,
        nights: this.numberOfNights,
        totalPrice: this.totalPrice,
        guestDetails: {
          fullName: this.fullName,
          email: this.email,
          phone: this.phone,
          country: this.country,
          specialRequests: this.specialRequests,
          arrivalTime: this.arrivalTime,
          occasion: this.occasion
        },
        marketingPreferences: {
          marketingConsent: this.marketingConsent,
          contactPreference: this.contactPreference
        },
        bookingReference: 'HH' + Math.floor(Math.random() * 10000000)
      };
      
      console.log('Booking completed:', booking);
      
      // Simulate server processing
      setTimeout(() => {
        // Remove loading state
        if (bookingCard) {
          bookingCard.classList.remove('loading');
        }
        
        // Show success message
        this.showSuccess('Your booking has been successfully completed! Confirmation #' + booking.bookingReference);
        
        // Navigate to confirmation page with smooth transition
        setTimeout(() => {
          this.router.navigate(['/booking-confirmation'], { 
            state: { bookingDetails: booking } 
          });
        }, 1500);
      }, 2000);
    }
  }
  
  // Keyboard navigation support with enhanced accessibility
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    // Gallery navigation in Step 1
    if (this.currentStep === 1) {
      if (event.key === 'ArrowLeft') {
        this.prevImage();
      } else if (event.key === 'ArrowRight') {
        this.nextImage();
      }
    }
    
    // Step navigation with keyboard
    if (event.altKey) {
      if (event.key === 'n' || event.key === 'N') {
        // Alt+N for next step
        if (this.canProceed() && this.currentStep < 4) {
          this.nextStep();
          event.preventDefault();
        }
      } else if (event.key === 'p' || event.key === 'P') {
        // Alt+P for previous step
        if (this.currentStep > 1) {
          this.prevStep();
          event.preventDefault();
        }
      }
    }
  }
}