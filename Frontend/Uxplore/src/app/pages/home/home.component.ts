import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet, IonGrid, IonContent, IonCol, IonCard, IonRow, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/angular/standalone';
import { EventCardComponent } from 'src/app/event-card/event-card.component';
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports : [IonApp, IonRouterOutlet,IonGrid, IonCol, IonRow, IonCard, CommonModule,IonContent,IonCardContent,IonCardHeader,IonCardTitle,IonCardSubtitle,EventCardComponent ]
})
export class HomeComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
