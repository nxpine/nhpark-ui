import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  login(username: string, email: string): void {
    localStorage.setItem(
      'nhpark_user',
      JSON.stringify({
        username: username,
        email: email
      })
    );
  }

  logout(): void {
    localStorage.removeItem('nhpark_user');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('nhpark_user') !== null;
  }

  getUser(): any {
    const user = localStorage.getItem('nhpark_user');

    return user ? JSON.parse(user) : null;
  }
}