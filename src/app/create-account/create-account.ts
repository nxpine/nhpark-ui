import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

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

  constructor(private router: Router, private auth: Auth) {}

  createAccount(): void {

  this.errorMessage = '';
  this.successMessage = '';

  if (
    !this.username ||
    !this.email ||
    !this.password ||
    !this.confirmPassword
  ) {
    this.errorMessage = 'Please fill in all fields.';
    return;
  }

  if (this.password !== this.confirmPassword) {
    this.errorMessage = 'Passwords do not match.';
    return;
  }

  this.loading = true;

  // Save the logged-in user
  this.auth.login(this.username, this.email);

  console.log('Username:', this.username);
  console.log('Email:', this.email);

  setTimeout(() => {

    this.loading = false;

    this.successMessage = 'Account created successfully!';

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);

  }, 500);
}
}