import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { arrowForwardCircleOutline, locationOutline } from 'ionicons/icons';
import { IonApp, IonRouterOutlet, IonGrid, IonContent, IonCol, IonCard, IonRow, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/angular/standalone';
import { EventCardComponent } from 'src/app/event-card/event-card.component';
import { addIcons } from 'ionicons';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ListingsService } from 'src/app/services/listings.service';
import { Listing } from 'src/app/interfaces/interfaces';
import { Event } from 'src/Models/event-card';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { AdsHeaderComponent } from './components/ads-header/ads-header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [IonicModule, CommonModule, EventCardComponent, HttpClientModule, AdsHeaderComponent],
  providers: [ListingsService],
})
export class HomeComponent implements OnInit {

  listings: Listing[] = [];
  sortedListingDetails: Listing[] = [];
  listingDetails: { ListingID: number, lat: number, lon: number, distance?: number }[] = [];
  userLat: number = 0;
  userLon: number = 0;
  isLoading: boolean = true;
  events: Event[] = [];
  color: string = "white";

  constructor(private platform: Platform, private http: HttpClient, private listingService: ListingsService, private router: Router) { }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.getUserLocation();
    });
    addIcons({
      'arrow-forward-circle-outline': arrowForwardCircleOutline,
      'location-outline': locationOutline
    });
  }

  navpage(path: string, eventId: number = 1) {
    this.router.navigate([path], { queryParams: { id: eventId } });
  }

  async getUserLocation() {
    try {
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000, // optional, in milliseconds
        maximumAge: 0 // optional, disable cache
      });
      this.userLat = position.coords.latitude;
      this.userLon = position.coords.longitude;
      console.log('User Location:', this.userLat, this.userLon);
      this.fetchAllListings();
    } catch (error) {
      this.handleGeolocationError(error);
    }
  }

  handleGeolocationError(error: any) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.error('User denied the request for Geolocation.');
        break;
      case error.POSITION_UNAVAILABLE:
        console.error('Location information is unavailable.');
        break;
      case error.TIMEOUT:
        console.error('The request to get user location timed out.');
        break;
      default:
        console.error('An unknown error occurred:', error.message);
        break;
    }
  }

  fetchAllListings() {
    this.listingService.getalllistings().subscribe(
      (allListings) => {
        this.listings = allListings;
        console.log('Fetched Listings:', this.listings);
        this.fetchAllCoordinates();
      },
      (error) => {
        console.error('Error fetching listings:', error);
      }
    );
  }

  fetchAllCoordinates() {
    let fetchCount = 0;
    this.listings.forEach((listing) => {
      this.fetchAddress(listing.id, listing.location, this.userLat, this.userLon, () => {
        fetchCount++;
        if (fetchCount === this.listings.length) {
          this.sortListingsByDistance(this.userLat, this.userLon);
        }
      });
    });
  }

  fetchAddress(ListingID: number, location: string, userLat: number, userLng: number, callback: () => void) {
    let area = location.split(',')[0];
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=3&q=${area}, Johannesburg`;
    this.http.get<any[]>(url).subscribe(
      data => {
        if (data && data.length > 0) {
          const element = data[0];
          const listingDetail = { ListingID, lat: parseFloat(element.lat), lon: parseFloat(element.lon) };
          this.listingDetails.push(listingDetail);
          console.log(`Fetched coordinates for listing ID ${ListingID}:`, listingDetail);
        } else {
          console.log(`Address not found for listing ID: ${ListingID}`);
        }
        callback();
      },
      err => {
        console.log('Error:', err);
        callback();
      }
    );
  }

  sortListingsByDistance(userLat: number, userLng: number) {
    this.listingDetails = this.listingDetails.map(detail => {
      const distance = this.calculateDistance(userLat, userLng, detail.lat, detail.lon);
      return { ...detail, distance };
    });

    this.listingDetails.sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));

    console.log('Sorted Listings by Distance:', this.listingDetails);
    this.loadSortedListings();
  }

  loadSortedListings() {
  this.sortedListingDetails = [];
  this.events = [];
  const promises = this.listingDetails.map((detail, index) => {
    return new Promise<void>((resolve, reject) => {
      this.listingService.getOneListing(detail.ListingID).subscribe(onelisting => {
        this.sortedListingDetails[index] = onelisting;
        this.listingService.getlistingimages(onelisting.id).subscribe(item => {
          const event: Event = {
            Id: onelisting.id ?? 0,
            Name: onelisting.name,
            Location: `${onelisting.location.substring(0, 10)}...`,
            PriceRange: onelisting.avG_price.toString(),
            Times: onelisting.hours,
            Rating: '',
            SafetyRating: '',
            ImageData: item[0].image
          };
          this.events[index] = event;
          resolve();
        }, error => reject(error));
      }, error => reject(error));
    });
  });

  Promise.all(promises).then(() => {
    this.isLoading = false;
    console.log("Loaded events: ", this.events);
  }).catch(error => {
    this.isLoading = false;
    console.error("Error loading events: ", error);
  });
}


  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the Earth in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
