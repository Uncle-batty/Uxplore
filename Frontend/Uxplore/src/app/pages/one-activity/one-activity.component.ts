import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import {
  shieldCheckmarkOutline,
  locationOutline,
  pricetagOutline,
  callOutline,
  timeOutline,
  star,
  personCircleOutline
} from 'ionicons/icons';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@Component({
  selector: 'app-one-activity',
  templateUrl: './one-activity.component.html',
  styleUrls: ['./one-activity.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OneActivityComponent implements OnInit {

    slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true
  };


  constructor() {}




  ngOnInit() {
    addIcons({
      'shield-checkmark-outline': shieldCheckmarkOutline,
      'location-outline': locationOutline,
      'pricetag-outline': pricetagOutline,
      'call-outline': callOutline,
      'time-outline': timeOutline,
      'star': star,
      'person-circle-outline': personCircleOutline
    });
  }
}
