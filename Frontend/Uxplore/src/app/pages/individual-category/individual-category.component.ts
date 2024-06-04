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
  @Input() bannerImage:string = ""
  constructor(private router: Router, private route: ActivatedRoute, private lservice: ListingsService) {

  }

  listings: Listing[] = [];
  ngOnInit() {

    this.bannerImage = `url("../../../assets/dateNightBGIMG.jpg") no-repeat center center fixed`
    this.route.queryParams.subscribe(params => {
      this.categoryName = params['id'];
    });

    this.lservice.listallbycategory(this.categoryName).subscribe((data) => {
      this.listings = data;
    console.log("Events:",this.popevents(data));

    });



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
            Location: listing.location,
            PriceRange: '9 - 5',
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
