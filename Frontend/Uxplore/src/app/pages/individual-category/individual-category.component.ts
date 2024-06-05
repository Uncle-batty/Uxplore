import { Component, OnInit, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EventCardComponent } from 'src/app/event-card/event-card.component';
import { Event } from 'src/Models/event-card';
import { CommonModule } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { ActivatedRoute } from '@angular/router';
import { ListingsService } from 'src/app/services/listings.service';
import { HttpClientModule } from '@angular/common/http';
import { Listing } from 'src/app/interfaces/interfaces';


@Component({
  selector: 'app-individual-category',
  standalone: true,
  templateUrl: './individual-category.component.html',
  styleUrls: ['./individual-category.component.scss'],
  imports: [EventCardComponent,CommonModule, HttpClientModule],
  providers: [ListingsService]
})
export class IndividualCategoryComponent  implements OnInit {
  events: Event[] = [];
  categoryName : string = "Category Name"
  color: string = "";
  @Input() bannerImage:string = ""
  constructor(private router: Router, private route: ActivatedRoute, private lservice: ListingsService) {

  }

  listings: Listing[] = [];
  ngOnInit() {

    this.bannerImage = `url("../../../assets/dateNightBGIMG.jpg") no-repeat center center fixed`
    this.route.queryParams.subscribe(params => {
      this.categoryName = params['id'];
    });
    switch (this.categoryName) {
      case 'Adrenaline':
        this.color = '#ff6e00';
        break;
      case 'Date Night':
        this.color = '#cc00FF';
        break;
      case 'Outdoors':
        this.color = ' #2B3628';
        break;
    }
    if (this.categoryName === 'all') {
        this.lservice.getalllistings().subscribe((alllistings) => {
          this.listings = alllistings;
          console.log('Events:', this.popevents(alllistings));
        });
    }
    else
    {
      this.lservice.listallbycategory(this.categoryName).subscribe((data) => {
        this.listings = data;
        console.log('Events:', this.popevents(data));
      });
    }


  }

  navpage(path : string, eventid: number = 1) {

  this.router.navigate([path], { queryParams: {id: eventid} });
}


popevents(currentListing : Listing[]) : Event[] {
  currentListing.forEach((listing) => {
    this.lservice.getlistingimages(listing.id).subscribe(
      (data) => {

          let newEvent: Event = {
            Id: listing.id,
            Name: listing.name,
            Location: listing.location.substring(0, 10)+ "...",
            PriceRange: listing.avG_price.toString(),
            Times: listing.hours,
            Rating: '',
            SafetyRating: '',
            ImageData: data[0].image,
          };
          this.events.push(newEvent);
      },
      (error) => {

      }
    );


});
return this.events

}
}
