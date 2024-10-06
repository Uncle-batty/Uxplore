import { signInWithPopup } from 'firebase/auth';
import { SocialAuthService } from './../../services/social-auth.service';
import { UsersService } from './../../services/users.service';
import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Email, User, interests } from 'src/app/interfaces/interfaces';
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
  isBusinessModelOpen = false;
  isBusinessRegOpen = false;
  userID : number = 0;

  email: string = '';
  password: string = '';
  Fullname: string = '';
  Confermpassword: string = '';
  toastMessage = "";
  isToastOpen = false;


  /* Business variables (containers) used in model for HTML page */
  Ownername: string = '';
  Businessname: string = '';
  Businessemail: string = '';
  Businesscell: string = '';
  Businessdescription: string = '';
  Location: string = '';
  Operatinghours: string = '';
  Reservation: string = '';
  Averagespending: string = '';
  Websitelink: string = '';
  Businesspassword: string = '';
  Businessconfirmpassword: string = '';

  // Forgot password handlers
  isForgotPasswordModalOpen = false;
  forgotPasswordCode = '';
  userForgotPasswordCode = '';
  newPassword1 = '';
  newPassword2 = '';
  showEmailTb = false;
  showCodeTb = false;
  showNewPasswordTb = false;

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





  constructor(private router: Router, private service: UsersService, private socialAuth: SocialAuthService) {
    addIcons({logoGoogle, logoFacebook, logoTwitter})

  }

  navpage(path: string) {
    this.router.navigate([path]);
  }

  ngOnInit() {}

  navigateUser (user: User){
    if (user.userType == 'business'){
      this.router.navigate(['/business/businessDashboard']);

    }else {
      this.router.navigate(['/users/home'])
    }

  }

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

  openBusinessModel(){
    this.isBusinessModelOpen = true
    this.closeBusinessRegModel();
  }
  closeBusinessModel(){
    this.isBusinessModelOpen = false;
  }
  openBusinessregModel(){
    this.isBusinessRegOpen = true;
    this.closeBusinessModel();
  }
  closeBusinessRegModel(){
    this.isBusinessRegOpen = false;
  }

  openForgotPasswordModal(){
      this.showEmailTb = true;
    this.isForgotPasswordModalOpen = true;
    this.closeBusinessModel();
    this.closeBusinessRegModel();
    this.closeInterestsModel();
    this.closeModal();
  }

  closeForgotPasswordModal(){
    this.isForgotPasswordModalOpen = false;
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
            console.log("Login response: ", response)

          localStorage.setItem('user', JSON.stringify(response));

          this.navigateUser(response);

          //

          } else {
            this.isToastOpen = true;
            this.toastMessage = "Please enter a valid email";
          }
        },
        (error) => {
          if (error instanceof HttpErrorResponse){
            if (error.status == 400){
                this.isToastOpen = true;
              this.toastMessage = "Password is incorrect";
              }
            if(error.status == 404){
              this.isToastOpen = true;
              this.toastMessage = "Email not found, please register";
            }
          }
          console.error('Login request failed', error.status);

        }
      );
    }
  }


  logregdetails() {
    if (this.validateEmail(this.email))
      {
        if (this.validatePassword(this.password) && this.password === this.Confermpassword)
          {
            this.service.loginuser(this.email).subscribe((res) => {
              if (res){
                this.toastMessage = "User already exists, please login";
                this.isToastOpen = true;
              }
            }, (error) => {
              if (error instanceof HttpErrorResponse){
                if (error.status == 404){
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
              }
            })


          }
          else {
              this.toastMessage = "Password must contain at least one upper case character and be over 8 characters";
              this.isToastOpen = true;
          }
      }
      else
      {
          this.isToastOpen = true;
          this.toastMessage = "This is an invalid email"
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
      if (error instanceof HttpErrorResponse){
        if (error.status == 400){
          console.error('Failed to register user:', error);
          this.isToastOpen = true;
          this.toastMessage = "Email already exists, please log in";
        }
      }
    }
  );
}


onForgotPasswordEmailConfirm(){
  if (!this.validateEmail(this.email)||  this.email.trim() == ''){
    this.toastMessage = "Please enter a valid email"
    this.isToastOpen = true
    return
  }

  this.forgotPasswordCode =  this.generateFiveDigitNumber().toString();
  const newForgotEmail : Email = {
    email : this.email,
    body : ForgotPasswordEmail(this.forgotPasswordCode),
    subject: "Forgot Password"
  }

  this.service.sendEmail(newForgotEmail).subscribe((res) => {
    if (res) {
      this.user = res;
      this.toastMessage = "Code has been sen to your email";
      this.isToastOpen = true;
      this.showEmailTb = false;
      this.showCodeTb = true;
    }
  }, (error) =>{
    if (error instanceof HttpErrorResponse ){
      if (error.status == 404){
        this.toastMessage = "This is email is not registered, please register";
        this.isToastOpen = true;
      } else if (error.status == 400){
        this.toastMessage = "Failed to send email";
        this.isToastOpen = true;
      }
    }
  })
}

onConfirmCode(){
  if (this.userForgotPasswordCode.trim() == ""){

    this.toastMessage = "Please fill in the code";
    this.isToastOpen = true;
    return;
  }

  if (this.userForgotPasswordCode != this.forgotPasswordCode){
    this.toastMessage = "Code is incorrect"
    this.isToastOpen = true;
    return;
  }

  this.showNewPasswordTb = true;
  this.showCodeTb = false;
}

onNewPasswordClick(){
  if (this.newPassword1.trim() == '' || this.newPassword2.trim() == ''){
    this.toastMessage = "Please enter all fields";
    this.isToastOpen = true;
    return;
  }

  if (!this.validatePassword(this.newPassword1)){
    this.toastMessage = "Password must contain at least one upper case character and be over 8 characters";
    this.isToastOpen = true;
    return;
  }


  if (this.newPassword1.trim() != this.newPassword2.trim()){
    this.toastMessage = "Please make sure passwords match"
    this.isToastOpen = true;
    return;
  }


  const newUser : User = {
    id : this.user?.id,
    fName: this.user?.fName,
    lName: this.user?.lName,
    email: this.user?.email ?? "",
    password: this.newPassword1,
    userType: this.user?.userType
  }

  this.service.updateUser(newUser).subscribe((res) => {
    this.toastMessage = "Successfully reset password, please log";
    this.isToastOpen = true;
    this.showNewPasswordTb = false;
    this.isForgotPasswordModalOpen = false;
  })
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
                        this.navigateUser(response);
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
                        this.navigateUser(response);
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
                        this.navigateUser(response);
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

  generateFiveDigitNumber(): number {
    return Math.floor(10000 + Math.random() * 90000);
}

}

export interface selectedInterest {
  name: string;
  selected: boolean;
}

export const ForgotPasswordEmail = (code: string) : string => {

  let email = `
<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Thank You for Signing Up</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            background-image: radial-gradient(circle at center center, rgba(79,22,97, 0.05) 0%, rgba(79,22,97, 0.05) 15%,rgba(91,13,123, 0.05) 15%, rgba(91,13,123, 0.05) 34%,rgba(73,34,126, 0.05) 34%, rgba(73,34,126, 0.05) 51%,rgba(237, 237, 237,0.05) 51%, rgba(237, 237, 237,0.05) 75%,rgba(83,25,123, 0.05) 75%, rgba(83,25,123, 0.05) 89%,rgba(28,9,37, 0.05) 89%, rgba(28,9,37, 0.05) 100%),radial-gradient(circle at center center, rgb(8,8,8) 0%, rgb(8,8,8) 6%,rgb(8,8,8) 6%, rgb(8,8,8) 12%,rgb(8,8,8) 12%, rgb(8,8,8) 31%,rgb(8,8,8) 31%, rgb(8,8,8) 92%,rgb(8,8,8) 92%, rgb(8,8,8) 97%,rgb(8,8,8) 97%, rgb(8,8,8) 100%); background-size: 42px 42px;
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 5px;
            padding: 20px;
            text-align: center;
            }
            .email-header {
            background: linear-gradient(to right, #3f3d3d, rgb(8, 7, 7));
            color: white;
            padding: 10px 0;
            border-radius: 5px 5px 0 0;
            border: 3px solid #ffffff; /* Adjusted the border width and added the shorthand property */
        }

        .email-header img {
            max-width: 150px;
            margin-bottom: 10px;
        }
        .email-body {
            padding: 20px;
            color: white;
        }
        .email-footer {
            background-color: #f4f4f4;
            color: #888888;
            padding: 10px;
            border-radius: 0 0 5px 5px;
        }
        .btn-confirm {
            background: linear-gradient(to right, black, #4CAF50);
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
        }
        .btn-confirm:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <div class='email-container'>
        <div class='email-header'>
            <img src='https://i.ibb.co/qWsTJDv/Logo.png' alt='Your Company Logo'>
        </div>
        <div class='email-body'>
            <p>Dear Customer,</p>
            <p>This code is to allow you to reset your password. Enter this code into the UXplore app.</p>
                <style>
        @keyframes slide {
            0% { transform: translateX(0%); }
            20% { transform: translateX(0%); }
            25% { transform: translateX(-100%); }
            45% { transform: translateX(-100%); }
            50% { transform: translateX(-200%); }
            70% { transform: translateX(-200%); }
            75% { transform: translateX(-300%); }
            95% { transform: translateX(-300%); }
            100% { transform: translateX(0%); }
        }

        .carousel-container {
            width: 100%;
            overflow: hidden;
            position: relative;
        }

        .carousel {
            display: flex;
            width: 400%;
            animation: slide 6s infinite;
        }

        .carousel img {
            width: 25%;
            transition: transform 4s;
        }
    </style>
</head>
<body>
    <div class='email-body'>


            <h3>Code: ${code}</h3>
        </div>
        <div class='email-footer'>
            <p>&copy; 2024 Uxplore.All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

return email
}
