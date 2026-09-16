import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
selector: 'app-parks',
standalone: false,
templateUrl: './parks.html',
styleUrl: './parks.scss'
})
export class ParksComponent {

// ================= ACCOUNT =================

username: string = 'User';
userEmail: string = '';
userInitials: string = 'U';

userMenuOpen: boolean = false;

// ================= SEARCH =================

selectedLocation: string = '';
selectedDate: string = '';
selectedTime: string = '';

// ================= PARKING =================

parks = [
{
name: 'Central Surrey Driveway',
location: 'Surrey, BC',
description: 'Private driveway close to local shops and destinations.',
price: 12,
featured: true,
imageClass: 'image-one'
},
{
name: 'Richmond Residential Space',
location: 'Richmond, BC',
description: 'Convenient residential parking with easy neighbourhood access.',
price: 10,
featured: false,
imageClass: 'image-two'
},
{
name: 'Langley Event Parking',
location: 'Langley, BC',
description: 'Private parking space suitable for nearby events.',
price: 14,
featured: false,
imageClass: 'image-three'
},
{
name: 'Delta Driveway Space',
location: 'Delta, BC',
description: 'Quiet private driveway with convenient local access.',
price: 11,
featured: false,
imageClass: 'image-four'
},
{
name: 'Burnaby Residential Parking',
location: 'Burnaby, BC',
description: 'Local residential parking for visitors and events.',
price: 13,
featured: false,
imageClass: 'image-five'
},
{
name: 'Vancouver Private Space',
location: 'Vancouver, BC',
description: 'Private parking near local destinations and businesses.',
price: 16,
featured: false,
imageClass: 'image-six'
}
];

selectedPark: string = '';

currentYear: number = new Date().getFullYear();

constructor(
private auth: Auth,
private router: Router
) {
this.loadUser();
}

// ================= LOAD USER =================

loadUser(): void {

const user = this.auth.getUser();

if (user) {

  this.username =
    user.username ||
    user.email?.split('@')[0] ||
    'User';

  this.userEmail =
    user.email || '';

  this.userInitials =
    this.getInitials(this.username);
}

}

// ================= INITIALS =================

getInitials(name: string): string {

if (!name) {
  return 'U';
}

const parts = name
  .trim()
  .split(/\s+/);

if (parts.length === 1) {

  return parts[0]
    .substring(0, 2)
    .toUpperCase();

}

return (
  parts[0].charAt(0) +
  parts[parts.length - 1].charAt(0)
).toUpperCase();


}

// ================= ACCOUNT MENU =================

toggleUserMenu(): void {

this.userMenuOpen =
  !this.userMenuOpen;


}

closeUserMenu(): void {


this.userMenuOpen = false;

}

// ================= LOGOUT =================

logout(): void {

this.userMenuOpen = false;

this.auth.logout();

this.router.navigate(
  ['/login'],
  {
    replaceUrl: true
  }
);

}

// ================= SEARCH =================

searchParking(): void {

console.log('Searching parking with:', {
  location: this.selectedLocation,
  date: this.selectedDate,
  time: this.selectedTime
});

/*
  For now, the page uses sample parking data.
  Your backend can be connected here later.
*/

if (this.selectedLocation) {

  this.parks = this.parks.filter(
    park =>
      park.location
        .toLowerCase()
        .includes(
          this.selectedLocation.toLowerCase()
        )
  );

}

this.selectedPark = '';

}

// ================= SELECT PARK =================

selectPark(name: string): void {


this.selectedPark = name;


}

}
