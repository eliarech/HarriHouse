import { Component } from '@angular/core';
import { ImageGalleryComponent } from '../../../components/image-gallery/image-gallery.component';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss'],
  imports: [ImageGalleryComponent]
})
export class PropertyDetailComponent {}
