import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { arrowForwardCircleOutline, searchOutline } from 'ionicons/icons';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { listingimages, Listing,  } from 'src/app/interfaces/interfaces';
import { ListingsService } from 'src/app/services/listings.service';
import {  HttpClientModule } from '@angular/common/http';
import { Event } from 'src/Models/event-card';
import { EventCardComponent } from 'src/app/event-card/event-card.component';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HttpClientModule, EventCardComponent],
  providers: [ListingsService],
})
export class ExploreComponent implements OnInit {
  term: string = '';
  llistings: Listing[] = [];
  events: Event[] = [];
  issearch: boolean = false;

  constructor(private router: Router, private lservice: ListingsService) {}

  navpage(path: string, name: string = 'Adrenaline') {
    this.router.navigate([path], { queryParams: { id: name } });
  }

  async serach(event: any) {
    const query = event.target.value.toLowerCase();
    console.log(query);
    this.issearch = query !== '' && query !== undefined && query !== null;

    if (this.issearch) {
      this.lservice.searchlistings(query).subscribe((data) => {
        this.llistings = data;
        this.popevents(this.llistings);
        console.log(this.events); // Check if events are logged here
      });
    } else {
      this.llistings = [];
      this.events = [];
    }
  }

  ngOnInit() {
    addIcons({
      'arrow-forward-circle-outline': arrowForwardCircleOutline,
      searchOutline: searchOutline,
    });
  }

  popevents(currentListing: Listing[]): Event[] {
    this.events = [];
    currentListing.forEach((listing) => {
      let newEvent: Event = {
        Id: listing.id,
        Name: listing.name,
        Location: listing.location,
        PriceRange: '9 - 5',
        Times: listing.hours,
        Rating: '',
        SafetyRating: '',
        ImageData: '',
      };
      this.events.push(newEvent);
    });
    return this.events;
  }
}
