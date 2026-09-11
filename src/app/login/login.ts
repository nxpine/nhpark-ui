import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {

  username = '';
  email = '';
  password = '';
  loading = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private auth: Auth
  ) {}

  login(): void {

    this.loading = true;
    this.errorMessage = '';

    console.log('Username:', this.username);
    console.log('Email:', this.email);

    setTimeout(() => {

      this.loading = false;

      // Save the logged-in user
      this.auth.login(this.username, this.email);

      // Go to home after login
      this.router.navigate(['/home']);

    }, 500);
  }
}
