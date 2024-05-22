import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/services/users.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing',
  standalone: true,
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  imports : [IonicModule, CommonModule, FormsModule],
  providers: [ UsersService ]
})
export class LandingComponent  implements OnInit {

  isModalOpen = false;
  isRegistrationModelOpen = false;
  isInterestsModelOpen = false;
  selectedInterests : string[] = []
  interests: selectedInterest[] = [
  { name: 'Adrenaline', selected : false },
  { name: 'Outdoors', selected : false },
  { name: 'Night Life', selected : false },
  { name: 'family friendly', selected : false },
  { name: 'Fitness', selected : false },
  { name: 'Adventure', selected : false }]

  email: string = ''
  password: string = ''
  constructor(private router: Router, private service : UsersService) { }

    navpage(path : string) {

  this.router.navigate([path]);
}
  ngOnInit() {

  }

  openModal() {
    this.isModalOpen = true;
    this.closeRegModel();
    this.closeInterestsModel();
  }

  closeModal() {
    this.isModalOpen = false;
  }

  openRegModel(){
    this.closeModal();
    this.closeInterestsModel();
    this.isRegistrationModelOpen = true;
  }

  closeRegModel() {
    this.isRegistrationModelOpen = false;
  }

  openInterestsModel(){
    this.closeModal();
    this.closeRegModel();
    this.isInterestsModelOpen = true;
  }

  closeInterestsModel(){
    this.isInterestsModelOpen = false;
  }

  toggleInterest(interest: selectedInterest){

  }

 login() {

 }


}

export interface selectedInterest {
  name: string,
  selected : boolean
}
