import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-landing',
  standalone: true,
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  imports : [IonicModule]
})
export class LandingComponent  implements OnInit {
  presentingElement = document.getElementById('0');
  constructor() { }

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
  }

}
