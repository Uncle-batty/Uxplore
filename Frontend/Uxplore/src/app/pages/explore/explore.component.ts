import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { arrowForwardCircleOutline } from 'ionicons/icons';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ExploreComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    addIcons({
      'arrow-forward-circle-outline': arrowForwardCircleOutline
    });
  }
}
