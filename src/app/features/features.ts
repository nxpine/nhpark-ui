import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Feature {
  number: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './features.html',
  styleUrl: './features.scss'
})
export class FeaturesComponent {

  features: Feature[] = [

    {
      number: '01',
      title: 'Discover Parks',
      description:
        'Browse available parks and find locations that fit your plans.'
    },

    {
      number: '02',
      title: 'Easy Reservations',
      description:
        'Select a date and create a reservation through a simple process.'
    },

    {
      number: '03',
      title: 'Booking Management',
      description:
        'Keep track of upcoming reservations and manage your visits.'
    },

    {
      number: '04',
      title: 'Customer Management',
      description:
        'Keep customer information organized and easily accessible.'
    },

    {
      number: '05',
      title: 'Vehicle Management',
      description:
        'Store and manage vehicle information associated with customers.'
    },

    {
      number: '06',
      title: 'Address Management',
      description:
        'Maintain customer addresses in one centralized system.'
    }

  ];

}