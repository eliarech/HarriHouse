import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  imports: [CommonModule], // Needed for *ngFor, etc.
})
export class GalleryComponent {
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
}
