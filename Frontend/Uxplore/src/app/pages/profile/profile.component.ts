import { Component, OnInit, } from '@angular/core';
import { IonIcon, IonTabButton, IonLabel, IonCardSubtitle, IonCard, IonCardHeader, IonCardTitle,IonGrid,IonRow,IonCol } from '@ionic/angular/standalone';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone:true,
  imports: [IonCardTitle, IonCardHeader, IonCard, IonCardSubtitle, IonLabel, IonTabButton, IonIcon,IonGrid,IonRow,IonCol],
})
export class ProfileComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}