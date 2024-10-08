import { defaultImage } from './../../APIBaseURL';
import { Component, OnInit } from '@angular/core';
import { IonIcon, IonTabButton, IonLabel, IonCardSubtitle, IonCard, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {megaphoneOutline, barChartOutline,  bookmarkOutline, searchOutline, homeOutline, gameControllerOutline, calendarClearOutline,notificationsOutline, logOutOutline, mapOutline, flash} from 'ionicons/icons';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Listing, User } from '../interfaces/interfaces';
import { ListingsService } from '../services/listings.service';
import { EventCardComponent } from '../event-card/event-card.component';
import { Event } from 'src/Models/event-card';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [EventCardComponent, IonCardTitle, IonCardHeader, IonCard, IonCardSubtitle, IonLabel, IonTabButton, IonIcon, CommonModule],
  providers: [ListingsService]
})
export class NavbarComponent implements OnInit   {
  isBusinessUser: boolean = false;
  events : Event[]= [];
  listings : Listing[] = []
  selectedEvent! : Event;
  foundListing= false;
  isMobile$: Observable<boolean> = new Observable<boolean>();

    isGameModelOpen = false;
    selectedFeeling: string = '';
    feelings: { name: string; }[] = [
  { name: 'Happy' },
  { name: 'Sad' },
  { name: 'Excited' },
  { name: 'Angry' },
  { name: 'Confused' },
  { name: 'Content' },
  { name: 'Grateful' },
  { name: 'Hopeful' },
  { name: 'Relaxed' },
  { name: 'Stressed' },
  { name: 'Surprised' },
  { name: 'Proud' },
  { name: 'Loved' },
  { name: 'Lonely' },
  { name: 'Disappointed' },
  { name: 'Frustrated' },
  { name: 'Optimistic' },
  { name: 'Anxious' },
  { name: 'Bored' },
  { name: 'Energized' }
  // Add more feelings as needed
];

//giving different nav bars for either business or user
setUserNav(){
  const userString = localStorage.getItem("user") ?? "";
  const user: User = JSON.parse(userString);

  if (user.userType == "business"){
    this.isBusinessUser = true;
  }else {
    this.isBusinessUser = false;
  }
}

isNotificationsModalOpen = false;
notifications = [
  { username: 'Rocomams', activity: 'Posted new wing challenge', timestamp: '5 min ago' },
  { username: 'Level4 Restaurant', activity: 'Couples night', timestamp:'1 hour ago' },
  { username: 'Orlando Towers Bungee', activity: '2-on-1 Special on Tuesdays', timestamp:'2 days ago'}
  // Add more notifications as needed
];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private listingService: ListingsService ) {
    addIcons({  bookmarkOutline, searchOutline, homeOutline, gameControllerOutline, calendarClearOutline, mapOutline, notificationsOutline,logOutOutline, megaphoneOutline, barChartOutline  });
   }

   navpage(path : string) {

  this.router.navigate([path]);
}
openModal() {
    this.isGameModelOpen = true;
    this.foundListing = false;
  }

  closeModal() {
    this.isGameModelOpen = false;
  }

  openNotificationsModal() {
    this.isNotificationsModalOpen = true;
  }

  closeNotificationsModal() {
    this.isNotificationsModalOpen = false;
  }

   toggleFeeling(feeling: { name: string; }) {
    this.selectedFeeling = feeling.name;
  }

  submitFeelings() {
    console.log('Selected feeling:', this.selectedFeeling);
    const amountOfListings = this.events.length;
    const listingIndex = Math.floor(Math.random() * (amountOfListings));
    this.selectedEvent = this.events[listingIndex];

    console.log("Selected Listing :",this.selectedEvent )
    this.foundListing = true;

  }
  logout() {
    localStorage.removeItem('user');
    this.navpage('/main/landing');
  }

  getAllListings(){
    this.listingService.getalllistings().subscribe((foundListings) => {
      this.listings = foundListings;
      this.events = this.popevents(this.listings);
    })


  }

   ngOnInit(): void {
    this.isMobile$ = this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).pipe(
      map(result => result.matches)
    );

    //Shows different Nav bars for different user types
    this.setUserNav();
    this.getAllListings();
  }

  popevents(currentListing: Listing[]): Event[] {
    currentListing.forEach((listing) => {
      this.listingService.getlistingimages(listing.id ?? 0).subscribe(
        (data) => {
          let newEvent: Event = {
            Id: listing.id ?? 0,
            Name: listing.name,
            Location: listing.location.substring(0, 10) + '...',
            max_price: listing.max_price,
            min_price: listing.min_price,
            Times: listing.hours,
            Rating: '',
            SafetyRating: '',
            ImageData: data[0].image,
          };
          this.events.push(newEvent);
        },
        (error) => {}
      );
    });
    console.log("Loaded events: ", this.events)
    return this.events;
  }

}
