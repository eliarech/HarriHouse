import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDateRangeSelectionStrategy, DateRange, MAT_DATE_RANGE_SELECTION_STRATEGY } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule,
    MatStepperModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule
  ]
})
export class BookingFormComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  
  bookingForm!: FormGroup;
  isLinear = true;
  minDate = new Date();
  maxDate = new Date(this.minDate.getFullYear() + 1, this.minDate.getMonth(), this.minDate.getDate());
  
  // Signals for reactive state
  nights = signal(0);
  baseRate = signal(225);
  totalPrice = signal(0);
  cleaningFee = signal(85);
  serviceFee = signal(0);
  
  // Property images
  propertyImages = [
    { src: 'assets/images/pic1.jpg', alt: 'Floor Plans' },
    { src: 'assets/images/pic2.jpg', alt: 'Property View' },
    { src: 'assets/images/pic3.jpg', alt: 'Living Room' },
    { src: 'assets/images/pic4.jpg', alt: 'Dining Area' },
    { src: 'assets/images/pic5.jpg', alt: 'Kitchen' },
    { src: 'assets/images/pic6.jpg', alt: 'Master Bedroom' },
    { src: 'assets/images/pic7.jpg', alt: 'Bathroom' },
    { src: 'assets/images/pic8.jpg', alt: 'Second Bedroom' }
  ];
  
  // Active image index
  activeImageIndex = 0;
  
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      dateInfo: this.fb.group({
        checkIn: ['', Validators.required],
        checkOut: ['', Validators.required]
      }),
      guestInfo: this.fb.group({
        adults: [1, [Validators.required, Validators.min(1), Validators.max(6)]],
        children: [0, [Validators.min(0), Validators.max(4)]],
        pets: [0, [Validators.min(0), Validators.max(2)]]
      }),
      contactInfo: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern('[0-9]+')]]
      })
    });
    
    // Update calculations when form changes
    this.bookingForm.get('dateInfo')?.valueChanges.subscribe(() => {
      this.calculateStay();
    });
    
    this.bookingForm.get('guestInfo')?.valueChanges.subscribe(() => {
      this.calculateFees();
    });
  }
  
  ngAfterViewInit(): void {
    // Any additional initialization after view init
  }
  
  calculateStay() {
    const checkIn = this.bookingForm.get('dateInfo.checkIn')?.value;
    const checkOut = this.bookingForm.get('dateInfo.checkOut')?.value;
    
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      this.nights.set(diffDays);
      this.calculateFees();
    }
  }
  
  calculateFees() {
    const subtotal = this.baseRate() * this.nights();
    const serviceFeePct = 0.12; // 12% service fee
    
    this.serviceFee.set(Math.round(subtotal * serviceFeePct));
    this.totalPrice.set(subtotal + this.cleaningFee() + this.serviceFee());
  }
  
  // Set active image in the gallery
  setActiveImage(index: number): void {
    this.activeImageIndex = index;
  }
  
  // Scroll images in the gallery
  scrollImages(direction: 'left' | 'right'): void {
    const container = this.scrollContainer.nativeElement;
    const scrollAmount = 300; // Adjust as needed
    
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }
  
  onSubmit() {
    if (this.bookingForm.valid) {
      console.log('Booking submitted:', this.bookingForm.value);
      // Add your submission logic here
    } else {
      this.bookingForm.markAllAsTouched();
    }
  }
}