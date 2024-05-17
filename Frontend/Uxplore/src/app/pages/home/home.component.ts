import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports : [IonApp, IonRouterOutlet]
})
export class HomeComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
