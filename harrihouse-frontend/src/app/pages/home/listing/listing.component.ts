import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
  imports: [CommonModule],
})
export class ListingComponent {
  images = [
    'assets/images/pic1.jpg',
    'assets/images/pic2.jpg',
    'assets/images/pic3.jpg',
    'assets/images/pic4.jpg',
    'assets/images/pic5.jpg',
    'assets/images/pic6.jpg',
    'assets/images/pic7.jpg',
    'assets/images/pic8.jpg',
    'assets/images/pic9.jpg',
    'assets/images/pic10.jpg',
    'assets/images/pic11.jpg',
    'assets/images/pic12.jpg',
    'assets/images/pic13.jpg',
    'assets/images/pic14.jpg',
    'assets/images/pic15.jpg',
    'assets/images/pic16.jpg',
    'assets/images/pic17.jpg',
    'assets/images/pic18.jpg',
    'assets/images/pic19.jpg',
    'assets/images/pic20.jpg',
    'assets/images/pic21.jpg',
    'assets/images/pic22.jpg',
    'assets/images/pic23.jpg',
    'assets/images/pic24.jpg',
    'assets/images/pic25.jpg',
    'assets/images/pic26.jpg',
    'assets/images/pic27.jpg',
    'assets/images/pic28.jpg',
  ];

  constructor(private router: Router) {}

  openGallery(): void {
    this.router.navigate(['/gallery']);
  }
}
