import { IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-landing',
  standalone: true,
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  imports : [IonicModule]
})
export class LandingComponent  implements OnInit {
  presentingElement = document.getElementById('0');
  constructor(private router: Router) { }

    navpage(path : string) {

  this.router.navigate([path]);
}
  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
  }

}
