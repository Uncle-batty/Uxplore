import { UsersService } from './../../services/users.service';
import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { User, interests } from 'src/app/interfaces/interfaces';

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

interestCategoryMapping: { [key: string]: number } = {
  'Adrenaline': 1,
  'Outdoors': 2,
  'Night Life': 3,
  'family friendly': 4,
  'Fitness': 5,
  'Adventure': 6
};




  email: string = '';
  password: string = '';
  Fullname: string = '';
  Confermpassword: string = '';

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


 isUppercase(str: string, index: number): boolean {
  if (index < 0 || index >= str.length) {
    throw new Error("Index out of bounds");
  }

  const char = str[index];
  return char === char.toUpperCase() && char !== char.toLowerCase();
}
  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  validatePassword(password: string): boolean {
    let capsCount: number = 0;
    if (password.length < 8) {
      return false;
    }
    for (let i = 0; i < password.length ; i++) {
      if (this.isUppercase(password,i)) {
        capsCount++;
        console.log("Caps found")
      }
    }
   if (capsCount == 0) {
    return false;
   }
    return true;
  }

    isEmailToast = false;
  isPasswordToast = false;
  isFailedtoast = false;
  user: User|undefined;
  setOpen(isOpen: boolean) {
    this.isEmailToast = isOpen;
    this.isPasswordToast = isOpen;
    this.isFailedtoast = isOpen;
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
          this.showPasswordError = true;
        }
      );
    }
  }


  logregdetails() {
    if (this.validateEmail(this.email))
      {
        if (this.validatePassword(this.password) && this.password === this.Confermpassword)
          {
             this.user = {
                fName : this.Fullname.split(' ')[0],
                lName : this.Fullname.split(' ')[1],
                email : this.email,
                password : this.password,
                userType : "user",
              };
              console.log(this.user);
              this.openInterestsModel();
          }
          else {
              this.isPasswordToast = true;
          }
      }
      else
      {
          this.isEmailToast = true;
      }
  }


submituser() {
  this.service.registeruser(this.user).subscribe(
    (response) => {
      console.log(response);
      this.selectedInterests.forEach(interestName => {
        const categoryId = this.interestCategoryMapping[interestName];
        if (categoryId) {
          const interest: interests = {
            User_id: response.id,
            Category_id: categoryId  // Ensure correct spelling and casing
          };
          console.log(interest);
          console.log(`Adding interest: ${interestName} with Category_ID: ${categoryId}`);
          this.service.setuserinterests(interest).subscribe(
            res => {
              console.log(`Interest ${interestName} added successfully.`, res);
            },
            (error) => {
              console.error(`Failed to add interest ${interestName}.`, error);
            }
          );
        } else {
          console.error(`No matching Category_ID found for interest: ${interestName}`);
        }
      });
      localStorage.setItem('user', JSON.stringify(response));
      this.navpage('/user/home');
    },
    (error) => {
      console.error('Failed to register user', error);
      this.isFailedtoast = true;
    }
  );
}





}

export interface selectedInterest {
  name: string;
  selected: boolean;
}
