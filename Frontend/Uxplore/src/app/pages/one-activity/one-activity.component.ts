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
  addOutline,
} from 'ionicons/icons';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingsService } from 'src/app/services/listings.service';
import { HttpClientModule } from '@angular/common/http';
import {
  Listing,
  rateing,
  listingimages,
  Comment,
} from 'src/app/interfaces/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-one-activity',
  templateUrl: './one-activity.component.html',
  styleUrls: ['./one-activity.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HttpClientModule, FormsModule],
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
  comments: Comment[] = [];
  safetyrateings: string = 'not sure';
  rateing: number = 0;
  images: listingimages[] = []; // Ensure images is initialized to an empty array
  currentImageIndex: number = 0; // Track the current image index
  isModalOpen: boolean = false;
  activityRating: number = 0;
  safetyRating: number = 0;
  activityStars: Array<number> = new Array(5).fill(0);
  safetyStars: Array<number> = new Array(5).fill(0);
  comment: string = '';

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
          this.lservice.getactcomment(this.activity.id).subscribe((res) => {
            this.comments = res;
          });
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
      add: addOutline,
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

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
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

  makeCall(phone: string | undefined) {
    if (phone) {
      window.location.href = `tel:${phone}`;
    }
  }

  rateActivity(rating: number) {
    this.activityRating = rating;
    console.log(`Activity rating set to: ${this.activityRating}`);
  }

  rateSafety(rating: number) {
    this.safetyRating = rating;
    console.log(`Safety rating set to: ${this.safetyRating}`);
  }

  lograteing() {
    const userString = localStorage.getItem('user');
    if (userString && this.Actid) {
      // Ensure Actid is not undefined
      const user = JSON.parse(userString);
      const userId = user.id;

      const normalRateing: rateing = {
        id: 0,
        event_ID: 0,
        list_ID: this.Actid,
        user_id: userId,
        ratevalue: this.activityRating,
        type: 'normal',
      };

      const safetyRateing: rateing = {
        id: 0,
        event_ID: 0,
        list_ID: this.Actid,
        user_id: userId,
        ratevalue: this.safetyRating,
        type: 'safety',
      };

      this.lservice.addrateings(normalRateing).subscribe(
        (response) => {
          console.log('Normal rating added successfully:', response);
          this.refreshRatingsAndComments();
          this.closeModal();
        },
        (error) => {
          console.error('Error adding normal rating:', error);
          this.refreshRatingsAndComments();
          this.closeModal();
        }
      );

      this.lservice.addrateings(safetyRateing).subscribe(
        (response) => {
          console.log('Safety rating added successfully:', response);
          this.refreshRatingsAndComments();
          this.closeModal();
        },
        (error) => {
          console.error('Error adding safety rating:', error);
          this.refreshRatingsAndComments();
          this.closeModal();
        }
      );

      if (this.comment.length > 0) {
        const Comments: Comment = {
          id: 0,
          event_ID: 0,
          listing_ID: this.Actid, // Correct the property name
          comment: this.comment, // Ensure this.comment is correctly set
        };
        this.lservice.addcomments(Comments).subscribe(
          (response) => {
            console.log('Comment added successfully:', response);
            this.refreshRatingsAndComments();
          },
          (error) => {
            console.error('Error adding comment:', error);
            this.refreshRatingsAndComments();
          }
        );
      } else {
        this.refreshRatingsAndComments();
      }
    } else {
      console.error('User not found in localStorage or Actid is undefined');
    }
  }

  refreshRatingsAndComments() {
    if (this.activity) {
      this.lservice.getactivityrateings(this.activity.id).subscribe(
        (res) => {
          console.log('Updated ratings:', res);
          this.rateings = res;
          this.getrateings();
        },
        (error) => {
          console.log('Error fetching updated ratings:', error);
        }
      );
      this.lservice.getactcomment(this.activity.id).subscribe(
        (res) => {
          console.log('Updated comments:', res);
          this.comments = res;
        },
        (error) => {
          console.log('Error fetching updated comments:', error);
        }
      );
    }
  }
}
