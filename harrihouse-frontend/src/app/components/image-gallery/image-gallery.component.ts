import { Component } from '@angular/core';

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent {
  images = [
    'assets/images/property-1.jpg',
    'assets/images/property-2.jpg',
    'assets/images/hero.jpg',
    'assets/images/contact-bg.jpg'
  ];
}

