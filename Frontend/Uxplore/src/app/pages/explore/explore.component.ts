import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { arrowForwardCircleOutline, searchOutline } from 'ionicons/icons';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { listingimages, Listing } from 'src/app/interfaces/interfaces';
import { ListingsService } from 'src/app/services/listings.service';
import { HttpClientModule } from '@angular/common/http';
import { Event } from 'src/Models/event-card';
import { EventCardComponent } from 'src/app/event-card/event-card.component';
import { FormsModule } from '@angular/forms'; // Add this line

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    HttpClientModule,
    EventCardComponent,
    FormsModule,
  ], // Add FormsModule
  providers: [ListingsService],
})
export class ExploreComponent implements OnInit {
  term: string = '';
  llistings: Listing[] = [];
  events: Event[] = [];
  issearch: boolean = false;
  suggestions: Listing[] = [];

  constructor(private router: Router, private lservice: ListingsService) {}

  navpage(path: string, name: string = 'Adrenaline') {
    this.router.navigate([path], { queryParams: { id: name } });
  }

  async search(event: any) {
    const query = event.target.value.toLowerCase();
    this.issearch = query !== '' && query !== undefined && query !== null;

    if (this.issearch) {
      this.lservice.searchlistings(query).subscribe((data) => {
        this.llistings = data;
        this.popevents(this.llistings);
        this.suggestions = this.llistings;
      });
    } else {
      this.llistings = [];
      this.events = [];
      this.suggestions = [];
    }
  }

  selectSuggestion(suggestion: Listing) {
    this.term = suggestion.name; // Update the search term
    this.suggestions = [];
    this.search({ target: { value: this.term } }); // Trigger search
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
        Id: listing.id ?? 0,
        Name: listing.name,
        Location: listing.location.substring(0, 10) + '...',
        min_price: listing.min_price,
        max_price: listing.max_price,
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
