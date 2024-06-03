import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import {
  shieldCheckmarkOutline,
  locationOutline,
  pricetagOutline,
  callOutline,
  timeOutline,
  heartOutline,
  bookmarkOutline,
  star,
  shareSocialOutline,
  globeOutline,
  personCircleOutline
} from 'ionicons/icons';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ThisReceiver } from '@angular/compiler';
import { ActivatedRoute } from '@angular/router';
import { ListingsService } from 'src/app/services/listings.service';
import { HttpClientModule } from '@angular/common/http';
import { Listing } from 'src/app/interfaces/interfaces';
import { Router } from '@angular/router';


@Component({
  selector: 'app-one-activity',
  templateUrl: './one-activity.component.html',
  styleUrls: ['./one-activity.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule,HttpClientModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ListingsService]
})
export class OneActivityComponent implements OnInit {

    slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true
  };
  Actid: number|undefined;
  activity: Listing|undefined;
  constructor(private router: Router, private route: ActivatedRoute, private lservice: ListingsService) {}




  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.Actid = params['id'];
    });

    this.lservice.listoneactivity(this.Actid).subscribe(
      Response => {
          this.activity = Response;
      },
      (error) =>
        {
            console.log(error);
        }
    );
    addIcons({
      'shield-checkmark-outline': shieldCheckmarkOutline,
      'location-outline': locationOutline,
      'pricetag-outline': pricetagOutline,
      'call-outline': callOutline,
      'time-outline': timeOutline,
      'star': star,
      'globe-outline': globeOutline,
      'share-social-outline': shareSocialOutline,
      'bookmark-outline': bookmarkOutline,
      'heart-outline': heartOutline,
      'person-circle-outline': personCircleOutline
    });
  }

  getGoogleMapsUrl(): string {
  const location = this.activity?.location ?? '';
  return `https://www.google.co.za/maps/place/${encodeURIComponent(location)}`;
}

}
