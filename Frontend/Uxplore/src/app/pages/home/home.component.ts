import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { arrowForwardCircleOutline } from 'ionicons/icons';
import { IonApp, IonRouterOutlet, IonGrid, IonContent, IonCol, IonCard, IonRow, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/angular/standalone';
import { EventCardComponent } from 'src/app/event-card/event-card.component';
import { addIcons } from 'ionicons';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports : [IonicModule, CommonModule,EventCardComponent ]
})
export class HomeComponent  implements OnInit {

  constructor() { }

  ngOnInit() {
    addIcons({
      'arrow-forward-circle-outline': arrowForwardCircleOutline
    });
  }
}
