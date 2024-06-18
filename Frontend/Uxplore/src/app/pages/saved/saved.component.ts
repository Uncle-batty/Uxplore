import { Listing } from 'src/app/interfaces/interfaces';
import { UserInteraction } from './../../interfaces/interfaces';
import { EventCardComponent } from 'src/app/event-card/event-card.component';
import { Component, OnInit, input } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from 'src/Models/event-card';
import { CommonModule } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { ActivatedRoute } from '@angular/router';
import { query } from '@angular/animations';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from 'src/app/services/users.service';
import { ListingsService } from 'src/app/services/listings.service';
import { User } from 'firebase/auth';
import { IonicModule } from '@ionic/angular';



@Component({
  selector: 'app-saved',
  standalone: true,
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss'],
  imports: [ EventCardComponent, CommonModule, HttpClientModule,IonicModule],
  providers: [UsersService, ListingsService]
})
export class SavedComponent implements OnInit {
  events: Event[] = [];
  Listings : Listing[] =[];
  interactions : UserInteraction[] = [];
  categoryName: string = 'Item-Saved';

  constructor(private router: Router, private route: ActivatedRoute,private UsersService : UsersService, private listingService : ListingsService) {}

  ngOnInit() {
        this.createTestEvents();
        this.route.queryParams.subscribe((params) => {
          this.categoryName = params['id'];
        });
  }

  navpage(path: string, eventid: string = '1') {
    this.router.navigate([path], { queryParams: { id: eventid } });
  }

  createTestEvents() {
    this.UsersService.getInteractionsOfType("Saved").subscribe((inters) => {
      this.interactions = inters;

      inters.forEach((item) => {
        this.listingService.getOneListing(item.listing_ID ?? 0).subscribe((event) => {
          this.listingService.getlistingimages(item.id ?? 0).subscribe((image) => {
            let newEvent : Event = {
            Id : event.id,
            Name : event.name,
            Location: event.location.substring(0, 10) + '...',
            PriceRange: event.avG_price.toString(),
            Times: event.hours,
            Rating: "3",
            SafetyRating: "Chill",
            ImageData: image[0].image}
            this.events.push(newEvent)
          })
        }) })
      })
    }
}
