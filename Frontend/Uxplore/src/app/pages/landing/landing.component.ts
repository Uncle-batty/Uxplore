import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  imports : [IonicModule, CommonModule]
})
export class LandingComponent  implements OnInit {
  presentingElement = document.getElementById('0');
  isModalOpen = false;
  constructor(private router: Router) { }

    navpage(path : string) {

  this.router.navigate([path]);
}
  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

}
