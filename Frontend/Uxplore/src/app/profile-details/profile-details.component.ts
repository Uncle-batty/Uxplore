import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
  standalone:true,
  imports:[CommonModule,FormsModule]
})
export class ProfileDetailsComponent  implements OnInit {
 username: string = '';
  email: string = '';
  gender: string = '';

    constructor() {
    // Load user data from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.username = user.username || '';
    this.email = user.email || '';
    this.gender = user.gender || '';
  }
    updateProfile() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    // Update user data
    user.username = this.username;
    user.email = this.email;
    user.gender = this.gender;
    localStorage.setItem('user', JSON.stringify(user));
    }
  ngOnInit() {}

}
