import { HttpClientModule,HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../interfaces/interfaces';
import { UserDetailsService } from '../services/user-details.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class ProfileDetailsComponent implements OnInit {
  username: string = '';
  email: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';

  constructor(private userDetailsService: UserDetailsService, private http: HttpClient) {
    this.loadUserData();
  }

  ngOnInit() {
    console.log("ProfileDetailsComponent initialized");
  }

  loadUserData(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.username = user.username || '';
    this.email = user.email || '';
    console.log("User data loaded");
  }

  togglePasswordVisibility(inputId: string): void {
    const inputElement = document.getElementById(inputId) as HTMLInputElement;
    inputElement.type = inputElement.type === 'password' ? 'text' : 'password';
  }

  validateForm(): boolean {
    if (!this.username.trim() || !this.email.trim()) {
      alert('Username and Email are required.');
      return false;
    }
    if (this.newPassword && this.newPassword !== this.confirmNewPassword) {
      alert('Passwords do not match.');
      return false;
    }
    return true;
  }

  updateProfile(): void {
    if (this.validateForm()) {
      const user: User = {
        fName: this.username,
        email: this.email,
        password: this.newPassword ? this.newPassword : undefined
      };

      const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
      this.userDetailsService.updateUserDetails(userId, user).subscribe(
        (response: User) => {
          localStorage.setItem('user', JSON.stringify(response));
          alert('Profile updated successfully.');
        },
        (error: any) => {
          console.error('Error updating profile:', error);
          alert('Failed to update profile.');
        }
      );
    }
  }
}
