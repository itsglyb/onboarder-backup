import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService, 
    private router: Router) {}

  canActivate(): boolean {
    const token = this.authService.getToken();

    if (token) {
      // Token exists, user is authenticated
      return true;
    } else {
      // Token doesn't exist, redirect to login page
      this.router.navigate(['/member-login']);
      return false;
    }
  }
}
