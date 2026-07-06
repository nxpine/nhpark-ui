import { Component } from '@angular/core';

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

  login(): void {

    this.loading = true;
    this.errorMessage = '';

    // Temporary login
    console.log('Username:', this.username);
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    setTimeout(() => {
      this.loading = false;
      alert('Login clicked!');
    }, 500);

  }

}