import { UsersService } from './../../services/users.service';
import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-landing',
  standalone: true,
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
  providers: [UsersService]
})
export class LandingComponent implements OnInit {
  showEmailError = false;
  showPasswordError = false;
  isModalOpen = false;
  isRegistrationModelOpen = false;
  isInterestsModelOpen = false;
  selectedInterests: string[] = [];
  interests: selectedInterest[] = [
    { name: 'Adrenaline', selected: false },
    { name: 'Outdoors', selected: false },
    { name: 'Night Life', selected: false },
    { name: 'family friendly', selected: false },
    { name: 'Fitness', selected: false },
    { name: 'Adventure', selected: false }
  ];

  email: string = '';
  password: string = '';

  constructor(private router: Router, private service: UsersService) { }

  navpage(path: string) {
    this.router.navigate([path]);
  }

  ngOnInit() {}

  openModal() {
    this.isModalOpen = true;
    this.closeRegModel();
    this.closeInterestsModel();
  }

  closeModal() {
    this.isModalOpen = false;
  }

  openRegModel() {
    this.closeModal();
    this.closeInterestsModel();
    this.isRegistrationModelOpen = true;
  }

  closeRegModel() {
    this.isRegistrationModelOpen = false;
  }

  openInterestsModel() {
    this.closeModal();
    this.closeRegModel();
    this.isInterestsModelOpen = true;
  }

  closeInterestsModel() {
    this.isInterestsModelOpen = false;
  }

  toggleInterest(interest: selectedInterest) {
    interest.selected = !interest.selected;
    if (interest.selected) {
      this.selectedInterests.push(interest.name);
    } else {
      this.selectedInterests = this.selectedInterests.filter(i => i !== interest.name);
    }
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  login() {
    this.showEmailError = !this.validateEmail(this.email);
    this.showPasswordError = this.password.length < 6;

    if (!this.showEmailError && !this.showPasswordError) {
      this.service.loginuser(this.email).subscribe(
        (response) => {
          if (response) {
            if (this.password === response.password) {
              localStorage.setItem('user', JSON.stringify(response));
              this.navpage('/user/home');
            } else {
              this.showPasswordError = true;
            }
          } else {
            this.showEmailError = true;
          }
        },
        (error) => {
          console.error('Login request failed', error);
          this.showEmailError = true;
        }
      );
    }
  }
}

export interface selectedInterest {
  name: string;
  selected: boolean;
}
