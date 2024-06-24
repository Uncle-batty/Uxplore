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
  logoTwitter,
  logoFacebook,
  logoWhatsapp,
  ellipsisHorizontal,
  logoInstagram,
  copyOutline,
  bookmark,
  heart,
  notifications,
  notificationsOutline
} from 'ionicons/icons';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule, DatePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingsService } from 'src/app/services/listings.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import {
  Listing,
  rateing,
  listingimages,
  Comment,
  UserInteraction,
} from 'src/app/interfaces/interfaces';
import { Router } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-one-activity',
  templateUrl: './one-activity.component.html',
  styleUrls: ['./one-activity.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HttpClientModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ListingsService, UsersService],
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
  isToastOpen = false;
  toastMessage = ""
  // savedIcon = "bookmark-outline"
  // likedIcon = "heart-outline"
  // notificationIcon = "notifications-outline"
  interactionIcons = ["heart-outline", "bookmark-outline", "notifications-outline"]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private lservice: ListingsService,
    private clipboard: Clipboard,
    private userService: UsersService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.Actid = params['id'];
    });

    this.loadSavedImage();

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
      'add-outline': addOutline,
      'logo-twitter': logoTwitter,
      'logo-facebook': logoFacebook,
      'logo-whatsapp': logoWhatsapp,
      'copy-outline': copyOutline,
      'logo-instagram': logoInstagram,
      'ellipsis-horizontal': ellipsisHorizontal,
      bookmark,
      heart,
      notifications,
      notificationsOutline
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

  // Inside your OneActivityComponent class
  isSocialShareModalOpen: boolean = false;

  openSocialShareModal() {
    this.isSocialShareModalOpen = true;
    const userString = localStorage.getItem('user') ?? "";
    const user = JSON.parse(userString)
    this.userService.getInteractionsOfType("Share", user.id, this.Actid).subscribe((result) => {
      if (result[0] == null) {
        let currentDate = new Date(Date.now()).toLocaleDateString();
        currentDate = currentDate.replace("/","-" );
         const interaction: UserInteraction = {
          event_ID: 0,
          listing_ID: Number(this.Actid),
          user_ID: user.id,
          interaction_Type: "Share",
          interaction_Date: currentDate.replace("/","-" )
        };

        this.userService.setInteraction(interaction).subscribe(res => {
          //console.log("Shared: ", res)
        });
      }else {
        //console.log("Shared exists")
      }
    })
  }

  closeSocialShareModal() {
    this.isSocialShareModalOpen = false;
  }

  shareOnFacebook() {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      this.getShareUrl()
    )}`;
    window.open(shareUrl, '_blank');
  }

  shareOnTwitter() {
    const description = this.activity?.description || ''; // Provide a default empty string if description is undefined
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      this.getShareUrl()
    )}&text=${encodeURIComponent(description)}`;
    window.open(shareUrl, '_blank');
  }

  shareOnWhatsApp() {
    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      this.activity?.description || ''
    )} ${encodeURIComponent(this.getShareUrl())}`;
    window.open(shareUrl, '_blank');
  }

  copyLink() {
    const shareUrl = this.getShareUrl();
    this.clipboard.copy(shareUrl);
    // You can provide user feedback here, like displaying a toast
  }

  shareOnInstagram() {
    // Construct the Instagram sharing URL with your content
    const shareUrl = 'https://www.instagram.com/';
    window.open(shareUrl, '_blank');
  }

  async shareMore() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Share via',
          text: 'Check out this cool activity!',
          url: this.getShareUrl(),
        });
        console.log('Successful share');
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      // You can implement your custom sharing functionality here
      console.log('Web Share API not supported');
    }
  }

  // Add methods for sharing on other social media platforms as needed

  getShareUrl(): string {
    return window.location.href;
  }


  addInteraction(interactionType : string, addToastMessage: string, removeToastMessage:string, iconName: string, iconIndex:number){
     const userString = localStorage.getItem('user') ?? "";
    const user = JSON.parse(userString)
    this.userService.getInteractionsOfType(interactionType, user.id, this.Actid).subscribe((result) => {
      if (result[0] != null) {
        this.userService.deleteUserInteraction(result[0].id ?? 0).subscribe((response) => {
          this.toastMessage = removeToastMessage;
          this.isToastOpen = true;
          this.interactionIcons[iconIndex] = `${iconName}-outline`
        }, (error) => {
          console.log("Cant unLike and delete: ", error)
        })
      }else {

        let currentDate = new Date(Date.now()).toLocaleDateString()
        currentDate = currentDate.replace("/","-" )
        const interaction: UserInteraction = {
          event_ID: 0,
          listing_ID: Number(this.Actid),
          user_ID: user.id,
          interaction_Type: interactionType,
          interaction_Date: currentDate.replace("/","-" )
        }
        console.log("Interaction: ",interaction)

        this.userService.setInteraction(interaction).subscribe(result => {
          this.interactionIcons[iconIndex] = iconName
          this.toastMessage = addToastMessage;
          this.isToastOpen = true;
        }
        ),((error: any) => {
          console.log("error: ", error)
        })
      }
    }, (error) => {
      if (error instanceof HttpErrorResponse) {
          console.log("This is the error: ",error)
      }
    })
  }

  loadSavedImage(){
    const userString = localStorage.getItem('user') ?? "";
    const user = JSON.parse(userString)

    this.userService.getInteractionsOfType("All", user.id, this.Actid).subscribe((Response) => {
     Response.forEach(interaction => {
      if (interaction.interaction_Type == "Like"){
        this.interactionIcons[0] = "heart"
      }else if (interaction.interaction_Type == "Saved"){
        this.interactionIcons[1] = "bookmark"
      }else {
        this.interactionIcons[2] = "notifications"
      }
     })
    })
  }
}
