import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  standalone: false,
  templateUrl: './create-account.html',
  styleUrl: './create-account.scss'
})
export class CreateAccountComponent {

  username = '';
  email = '';
  password = '';
  confirmPassword = '';

  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private router: Router) {}

  createAccount(): void {

    this.errorMessage = '';
    this.successMessage = '';

    // Check fields
    if (
      !this.username ||
      !this.email ||
      !this.password ||
      !this.confirmPassword
    ) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    // Check password
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.loading = true;

    console.log('Username:', this.username);
    console.log('Email:', this.email);

    // Temporary account creation
    setTimeout(() => {

      this.loading = false;

      this.successMessage = 'Account created successfully!';

      // Return to login
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1000);

    }, 500);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

}