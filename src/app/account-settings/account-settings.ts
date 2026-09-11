import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './account-settings.html',
  styleUrls: ['./account-settings.scss']
})
export class AccountSettingsComponent implements OnInit {

  user: any = null;
  date: number = Date.now();

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.auth.getUser();

    if (!this.user) {
      this.router.navigate(['/login'], { replaceUrl: true });
    }
  }

  getDate(): number {
    return this.date;
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}