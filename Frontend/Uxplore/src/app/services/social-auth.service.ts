import { User } from '../interfaces/interfaces';
import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class SocialAuthService {
  firebaseConfig = {
    apiKey: "AIzaSyCMjJJLJAC1a4QEqCv9Axtv2_pxmtelv6c",
    authDomain: "uxplore-ac004.firebaseapp.com",
    projectId: "uxplore-ac004",
    storageBucket: "uxplore-ac004.appspot.com",
    messagingSenderId: "1037974431985",
    appId: "1:1037974431985:web:e86e393a5bb71c59d52150",
    measurementId: "G-0MZYHTEML2"
  };
  app = initializeApp(this.firebaseConfig);
  auth = getAuth(this.app);
  provider = new GoogleAuthProvider();
  facebookProvider = new FacebookAuthProvider();
  twitterProvider = new TwitterAuthProvider();

  constructor() { }

  // signUserWithGoogle(): any {
  //   return signInWithPopup(this.auth, this.provider).then((result) => {
  //     const user = result.user;
  //     const userData: User = {
  //       fName: user.displayName?.split(' ')[0] ?? "User",
  //       lName: user.displayName?.split(' ')[1] ?? "",
  //       email: user.email ?? "email",
  //       password: "google",
  //       userType: 'user',
  //   }

  //   })
  // }

}

