import { signInWithPopup } from 'firebase/auth';
import { SocialAuthService } from './../../services/social-auth.service';
import { UsersService } from './../../services/users.service';
import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { User, interests } from 'src/app/interfaces/interfaces';
import { logoGoogle, logoFacebook ,logoTwitter } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { UserSetting } from 'src/app/interfaces/interfaces';


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
  userID : number = 0;


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

  constructor(private router: Router, private service: UsersService, private socialAuth: SocialAuthService) {
    addIcons({logoGoogle, logoFacebook, logoTwitter})

  }

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
      this.service.loginuser(this.email,this.password).subscribe(
        (response) => {
          if (response) {

          localStorage.setItem('user', JSON.stringify(response));
          this.navpage('/user/home');

          //

          } else {
            this.showEmailError = true;
          }
        },
        (error) => {
          if (error instanceof HttpErrorResponse){
            if (error.status == 400){
              this.showPasswordError = true;
            }
            if(error.status == 404){
              this.showEmailError = true;
            }
          }
          console.error('Login request failed', error);

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
                lName : this.Fullname.split(' ')[1] ?? "",
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
      console.log('User registration successful:', response);

      if (response && response.id) {
        const userId = response.id;

        // Log the user ID to confirm it's correctly received
        console.log('Received userId from registration:', userId);

        // Create default user settings
        const defaultSettings: UserSetting = {
          userId: userId,  // Ensure correct case for `userId`
          push_Notices: 0,
          hide_Account: 0,
          account_Suggestions: 0,
          trending_Places: 0,
          reminders: 0
        };

        // Attempt to save default settings
        this.service.setUserSettings(defaultSettings).subscribe(
          (res) => {
            console.log('Default settings saved successfully:', res);
          },
          (error) => {
            console.error('Failed to save default settings:', error);
            if (error.status === 400) {
              console.error('Invalid UserId provided:', userId);
            }
          }
        );

        // Save user's selected interests
        this.selectedInterests.forEach(interestName => {
          const categoryId = this.interestCategoryMapping[interestName];
          if (categoryId) {
            const interest: interests = {
              User_id: userId,
              Category_id: categoryId
            };
            console.log(`Adding interest: ${interestName} with Category_ID: ${categoryId}`);
            this.service.setuserinterests(interest).subscribe(
              res => {
                console.log(`Interest ${interestName} added successfully:`, res);
              },
              (error) => {
                console.error(`Failed to add interest ${interestName}:`, error);
              }
            );
          } else {
            console.error(`No matching Category_ID found for interest: ${interestName}`);
          }
        });

        // Navigate to home page after successful registration
        localStorage.setItem('user', JSON.stringify(response));
        this.navpage('/user/home');
      } else {
        console.error('User registration response does not contain a valid ID:', response);
        this.isFailedtoast = true;
      }
    },
    (error) => {
      console.error('Failed to register user:', error, this.user);
      this.isFailedtoast = true;
    }
  );
}




signInWithGoogle(){
  let user : User = {
        fName: " no user",
        lName: "no user",
        email: " no email",
        password: "google",
        userType: 'user',
  }

  signInWithPopup(this.socialAuth.auth, this.socialAuth.provider).then((result) => {
    const user = result.user;
    const userData: User = {
        fName: user.displayName?.split(' ')[0] ?? "User",
        lName: user.displayName?.split(' ')[1] ?? "",
        email: user.email ?? "email",
        password: "UXploreSocialAuth",
        userType: 'user',
    };
    this.password = "UXploreSocialAuth";
    console.log(userData, user);

    if (userData.email != "no email") {
        this.service.loginuser(userData.email, "UXploreSocialAuth").subscribe(
            (response) => {
                if (response) {
                        localStorage.setItem('user', JSON.stringify(response));
                        this.navpage('/user/home');
                    }
            },
            (error) => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 404) {
                      this.user = userData;
                      this.openInterestsModel()

                    } else {
                        console.error('Login request failed', error);

                    }
                } else {
                    console.error('An unexpected error occurred', error);
                }
            }
        );
    }
}).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(`Error during sign-in with Google: ${errorCode} - ${errorMessage}`);
});

  }


  // const user : User = this.socialAuth.signUserWithGoogle();



signInWithFacebook(){

  let user : User = {
    fName: " no user",
        lName: "no user",
        email: " no email",
        password: "google",
        userType: 'user',
  }

  signInWithPopup(this.socialAuth.auth, this.socialAuth.facebookProvider).then((result) => {
    const user = result.user;
    const userData: User = {
        fName: user.displayName?.split(' ')[0] ?? "User",
        lName: user.displayName?.split(' ')[1] ?? "",
        email: user.email ?? "email",
        password: "UXploreSocialAuth",
        userType: 'user',
    };
    this.password = "UXploreSocialAuth";
    console.log(userData, user);

    if (userData.email != "no email") {
        this.service.loginuser(userData.email, "UXploreSocialAuth").subscribe(
            (response) => {
                if (response) {
                        localStorage.setItem('user', JSON.stringify(response));
                        this.navpage('/user/home');
                    }
            },
            (error) => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 404) {
                      this.user = userData;
                      this.openInterestsModel()

                    } else {
                        console.error('Login request failed', error);

                    }
                } else {
                    console.error('An unexpected error occurred', error);
                }
            }
        );
    }
}).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(`Error during sign-in with Google: ${errorCode} - ${errorMessage}`);
});


}

signInWithTwitter(){


let user : User = {
    fName: "no user",
        lName: "no user",
        email: "no email",
        password: "google",
        userType: 'user',
  }

  signInWithPopup(this.socialAuth.auth, this.socialAuth.twitterProvider).then((result) => {
    const user = result.user;
    const userData: User = {
        fName: user.displayName?.split(' ')[0] ?? "User",
        lName: user.displayName?.split(' ')[1] ?? "",
        email: user.email ?? "email",
        password: "UXploreSocialAuth",
        userType: 'user',
    };
    this.password = "UXploreSocialAuth";
    console.log(userData, user);

    if (userData.email != "no email") {
        this.service.loginuser(userData.email, "UXploreSocialAuth").subscribe(
            (response) => {
                if (response) {
                        localStorage.setItem('user', JSON.stringify(response));
                        this.navpage('/user/home');
                    }
            },
            (error) => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 404) {
                      this.user = userData;
                      this.openInterestsModel()

                    } else {
                        console.error('Login request failed', error);

                    }
                } else {
                    console.error('An unexpected error occurred', error);
                }
            }
        );
    }
}).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(`Error during sign-in with twitter: ${errorCode} - ${errorMessage}`);
});

}



}

export interface selectedInterest {
  name: string;
  selected: boolean;
}
