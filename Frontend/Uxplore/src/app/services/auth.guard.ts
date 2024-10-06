// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = localStorage.getItem('user');
    const userData : User = JSON.parse(user ?? "") ;
    if (userData.userType == "user") {
      // If user key exists, redirect to user routes
      this.router.navigate(['/user/home']);
      return false;
    }
    else if (userData.userType == "business"){
      this.router.navigate(['/business/businessDashboard']);
      return false;

    } else {
      // If user key does not exist, allow access to main routes
      return true;
    }
  }
}
