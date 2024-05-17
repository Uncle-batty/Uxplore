import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet, IonCardHeader, IonCard, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-event-card',
  standalone: true,
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
  imports: [IonCard, IonCardHeader, IonApp, IonRouterOutlet, IonCardTitle, IonCardSubtitle, IonCardContent]
})
export class EventCardComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
