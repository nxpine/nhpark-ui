import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  login(): void {

    this.loading = true;
    this.errorMessage = '';

    console.log('Username:', this.username);
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    setTimeout(() => {

      this.loading = false;

      // Go to home after login
      this.router.navigate(['/home']);

    }, 500);
  }

}