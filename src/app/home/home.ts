import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss'
  
})
export class HomeComponent {

  searchLocation: string = '';
  searchDate: string = '';
  searchPurpose: string = '';
  showUserMenu = true;
  userMenuOpen = false;

  username: string = '';

  constructor(
    private router: Router,
    private auth: Auth
  ) {
    const user = this.auth.getUser();

    if (user) {
      this.username = user.username;
    }
  }

  searchParking(): void {

    if (!this.searchLocation) {
      alert('Please select a location.');
      return;
    }

    if (!this.searchDate) {
      alert('Please select a date.');
      return;
    }

    if (!this.searchPurpose) {
      alert('Please select a purpose.');
      return;
    }

    console.log('Parking Search:', {
      location: this.searchLocation,
      date: this.searchDate,
      purpose: this.searchPurpose
    });
  }

toggleUserMenu(): void {
  this.userMenuOpen = !this.userMenuOpen;
}
  logout(): void {
    this.auth.logout();
    this.username = '';
    this.router.navigate(['/home']);
  }
}