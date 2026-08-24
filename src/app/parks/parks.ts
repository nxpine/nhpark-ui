import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Park {
  name: string;
  location: string;
  description: string;
  price: number;
  imageClass: string;
  featured: boolean;
}

@Component({
  selector: 'app-parks',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './parks.html',
  styleUrl: './parks.scss'
})
export class ParksComponent {

  selectedPark = '';

  parks: Park[] = [

    {
      name: 'Cedar Ridge Park',
      location: 'NORTH VANCOUVER',
      description:
        'Forest trails, open spaces and scenic mountain views.',
      price: 18,
      imageClass: 'image-one',
      featured: true
    },

    {
      name: 'Green Valley Park',
      location: 'SURREY',
      description:
        'Peaceful walking paths and spacious outdoor areas.',
      price: 15,
      imageClass: 'image-two',
      featured: true
    },

    {
      name: 'Lakeside Reserve',
      location: 'WHITE ROCK',
      description:
        'Waterfront views and relaxing open parkland.',
      price: 20,
      imageClass: 'image-three',
      featured: false
    }

  ];


  selectPark(name: string): void {
    this.selectedPark = name;
  }

}