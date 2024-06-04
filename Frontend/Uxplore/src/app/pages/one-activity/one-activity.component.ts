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
  starOutline,
  shareSocialOutline,
  globeOutline,
  personCircleOutline,
} from 'ionicons/icons';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingsService } from 'src/app/services/listings.service';
import { HttpClientModule } from '@angular/common/http';
import { Listing, rateing, listingimages } from 'src/app/interfaces/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-one-activity',
  templateUrl: './one-activity.component.html',
  styleUrls: ['./one-activity.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HttpClientModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ListingsService],
})
export class OneActivityComponent implements OnInit {
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
  };
  Actid: number | undefined;
  activity: Listing | undefined;
  rateings: rateing[] = [];
  safetyrateings: string = 'not sure';
  rateing: number = 0;
  images: listingimages[] = []; // Ensure images is initialized to an empty array
  currentImageIndex: number = 0; // Track the current image index

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private lservice: ListingsService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.Actid = params['id'];
    });

    this.lservice.listoneactivity(this.Actid).subscribe(
      (Response) => {
        this.activity = Response;
        if (this.activity) {
          this.lservice.getlistingimages(this.activity.id).subscribe(
            (data) => {
              this.images = data;
              this.startImageRotation(); // Start rotating images after fetching them
            },
            (error) => {
              console.log('Error fetching images:', error);
            }
          );

          this.lservice.getactivityrateings(this.activity.id).subscribe(
            (res) => {
              console.log(res);
              this.rateings = res;
              this.getrateings();
            },
            (error) => {
              console.log('Error fetching ratings:', error);
            }
          );
        }
      },
      (error) => {
        console.log('Error fetching activity:', error);
      }
    );

    addIcons({
      'shield-checkmark-outline': shieldCheckmarkOutline,
      'location-outline': locationOutline,
      'pricetag-outline': pricetagOutline,
      'call-outline': callOutline,
      'time-outline': timeOutline,
      star: star,
      'star-outline': starOutline,
      'globe-outline': globeOutline,
      'share-social-outline': shareSocialOutline,
      'bookmark-outline': bookmarkOutline,
      'heart-outline': heartOutline,
      'person-circle-outline': personCircleOutline,
    });
  }

  startImageRotation() {
    setInterval(() => {
      if (this.images.length > 0) {
        this.currentImageIndex =
          (this.currentImageIndex + 1) % this.images.length;
      }
    }, 4000); // Change image every 4 seconds
  }

  getrateings() {
    let saftycount = 0;
    let saftysum = 0;
    let sum = 0;
    let count = 0;
    this.rateings.forEach((rateing) => {
      if (rateing.type === 'safety') {
        saftycount++;
        saftysum += rateing.ratevalue;
      } else {
        count++;
        sum += rateing.ratevalue;
      }
    });

    this.rateing = count > 0 ? sum / count : 0;
    this.rateing = Math.min(Math.max(Math.round(this.rateing), 0), 5); // Ensure rating is between 0 and 5

    let safetyrate = saftycount > 0 ? saftysum / saftycount : 0;
    switch (Math.round(safetyrate)) {
      case 0:
        this.safetyrateings = 'Not sure';
        break;
      case 1:
        this.safetyrateings = 'Not safe';
        break;
      case 2:
        this.safetyrateings = 'Questionable';
        break;
      case 3:
        this.safetyrateings = 'Neutral';
        break;
      case 4:
        this.safetyrateings = 'Safe';
        break;
      case 5:
        this.safetyrateings = 'Really safe';
        break;
    }
  }

  get ratingArray() {
    return new Array(this.rateing).fill(0);
  }

  get emptyStarsArray() {
    return new Array(5 - this.rateing).fill(0);
  }

  getGoogleMapsUrl(): string {
    const location = this.activity?.location ?? '';
    return `https://www.google.co.za/maps/place/${encodeURIComponent(
      location
    )}`;
  }
}
