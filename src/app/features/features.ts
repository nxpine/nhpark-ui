import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
selector: 'app-features',
standalone: false,
templateUrl: './features.html',
styleUrl: './features.scss'
})
export class FeaturesComponent {

username = 'User';
userEmail = '';
userInitials = 'U';

userMenuOpen = false;

currentYear = new Date().getFullYear();

constructor(
private auth: Auth,
private router: Router
) {
this.loadUser();
}

/* ================= USER ================= */

loadUser(): void {

const user = this.auth.getUser();

if (user) {

  this.username =
    user.username ||
    user.email?.split('@')[0] ||
    'User';

  this.userEmail = user.email || '';

  this.userInitials =
    this.getInitials(this.username);
}
}

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

/* ================= ACCOUNT MENU ================= */

toggleUserMenu(): void {
this.userMenuOpen = !this.userMenuOpen;
}

closeUserMenu(): void {
this.userMenuOpen = false;
}

/* ================= LOGOUT ================= */

logout(): void {

this.userMenuOpen = false;

this.auth.logout();

this.router.navigate(
  ['/login'],
  { replaceUrl: true }
);


}

/* ================= OFFER SPACE ================= */

offerSpace(): void {


this.userMenuOpen = false;

// Change this route later if you create
// a dedicated Offer Your Space page.
this.router.navigate(['/offer-space']);


}

}
