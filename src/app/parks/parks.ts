import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface ParkingSpace {
  name: string;
  location: string;
  description: string;
  price: number;
  featured: boolean;
  imageClass: string;
}

@Component({
  selector: 'app-parks',
  standalone: false,
  templateUrl: './parks.html',
  styleUrl: './parks.scss'
})
export class ParksComponent {

  // ============================
  // SEARCH
  // ============================

  selectedLocation = '';
  selectedDate = '';
  selectedTime = '';

  // ============================
  // PARKING SELECTION
  // ============================

  selectedPark = '';

  // ============================
  // PARKING SPACES
  // ============================

  parks: ParkingSpace[] = [

    {
      name: 'Residential Driveway',
      location: 'Surrey, BC',
      description:
        'Private driveway parking near local events, businesses, and neighbourhood destinations.',
      price: 10,
      featured: true,
      imageClass: 'park-surrey'
    },

    {
      name: 'Private Parking Space',
      location: 'Richmond, BC',
      description:
        'Convenient neighbourhood parking for visitors attending nearby events and destinations.',
      price: 12,
      featured: false,
      imageClass: 'park-richmond'
    },

    {
      name: 'Neighbourhood Parking',
      location: 'Langley, BC',
      description:
        'Reserve a local parking space before arriving at your event or destination.',
      price: 8,
      featured: false,
      imageClass: 'park-langley'
    },

    {
      name: 'Driveway Parking',
      location: 'Delta, BC',
      description:
        'Private neighbourhood parking for visitors looking for a convenient space.',
      price: 9,
      featured: false,
      imageClass: 'park-delta'
    },

    {
      name: 'Event Parking Space',
      location: 'Burnaby, BC',
      description:
        'Nearby parking for events, appointments, celebrations, and local visits.',
      price: 11,
      featured: false,
      imageClass: 'park-burnaby'
    },

    {
      name: 'Residential Parking',
      location: 'Vancouver, BC',
      description:
        'Reserve a private parking space close to where you need to be.',
      price: 15,
      featured: true,
      imageClass: 'park-vancouver'
    }

  ];


  // ============================
  // SEARCH PARKING
  // ============================

  searchParking(): void {

    console.log('Searching for parking');

    console.log('Location:', this.selectedLocation);

    console.log('Date:', this.selectedDate);

    console.log('Time:', this.selectedTime);

  }


  // ============================
  // SELECT PARKING
  // ============================

  selectPark(name: string): void {

    this.selectedPark = name;

    console.log('Selected parking:', name);

  }


  // ============================
  // CLEAR SELECTION
  // ============================

  clearSelection(): void {

    this.selectedPark = '';

  }

}