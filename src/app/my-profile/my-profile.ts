import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './my-profile.html',
  styleUrls: ['./my-profile.scss']
})
export class MyProfileComponent implements OnInit {

  user: any = null;
  isEditing = false;

  profile = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: ''
  };

  originalProfile = { ...this.profile };

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.auth.getUser();

    if (!this.user) {
      this.router.navigate(['/login'], { replaceUrl: true });
      return;
    }

    this.profile = {
      firstName: this.user.firstName || '',
      lastName: this.user.lastName || '',
      username: this.user.username || '',
      email: this.user.email || '',
      phone: this.user.phone || ''
    };

    this.originalProfile = { ...this.profile };
  }

  get initials(): string {
    const first = this.profile.firstName?.charAt(0) || '';
    const last = this.profile.lastName?.charAt(0) || '';

    if (first || last) {
      return (first + last).toUpperCase();
    }

    return this.profile.username?.charAt(0).toUpperCase() || 'U';
  }

  editProfile(): void {
    this.originalProfile = { ...this.profile };
    this.isEditing = true;
  }

  saveProfile(): void {
    this.user = {
      ...this.user,
      ...this.profile
    };

    localStorage.setItem('nhpark_user', JSON.stringify(this.user));

    this.isEditing = false;
  }

  cancelEdit(): void {
    this.profile = { ...this.originalProfile };
    this.isEditing = false;
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  goBack(): void {
    this.router.navigate(['/account-settings']);
  }
}