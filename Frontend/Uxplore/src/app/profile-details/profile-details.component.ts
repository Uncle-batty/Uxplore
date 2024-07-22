import { HttpClientModule, HttpClient } from '@angular/common/http';
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
    this.username = user.fName || '';
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
        const userFromStorage = JSON.parse(localStorage.getItem('user') || '{}');
        
        // Create the user object with updated details
        const user: User = {
            id:userFromStorage.id,
            fName: this.username,
            lName: userFromStorage.lName || '',  // Use the existing field from local storage
            email: this.email,
            userType: userFromStorage.userType || '',  // Use the existing field from local storage
            password: this.newPassword ? this.newPassword : undefined  // Only include if a new password is provided
        };

        const userId = userFromStorage.id;  // Ensure this ID exists in local storage
        console.log('Updating user with ID:', userId, 'and data:', user);

        // Call the service to update user details
        this.userDetailsService.updateUserDetails(userId, user).subscribe(
            (response: User) => {
                localStorage.setItem('user', JSON.stringify(response));
                alert('Profile updated successfully.');
            },
            (error: any) => {
                console.error('Error updating profile:', error);
                if (error.status === 400 && error.error && error.error.errors) {
                    console.log('Validation errors:', error.error.errors);
                }
                alert('Failed to update profile.');
            }
        );
    }
}
}
