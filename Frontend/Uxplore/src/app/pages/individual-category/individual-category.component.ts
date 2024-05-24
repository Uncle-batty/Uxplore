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
  imports: [EventCardComponent,CommonModule, HttpClientModule]
})
export class IndividualCategoryComponent  implements OnInit {
  events: Event[] = [];
  categoryName : string = "Category Name"
  @Input() bannerImage:string = ""
  constructor(private router: Router, private route: ActivatedRoute, private lservice: ListingsService) {

  }

  listings: Listing[] = [];
  ngOnInit() {
    this.createTestEvents();
    this.bannerImage = `url("../../../assets/dateNightBGIMG.jpg") no-repeat center center fixed`
    this.route.queryParams.subscribe(params => {
      this.categoryName = params['id'];

    this.lservice.listallbycategory(this.categoryName).subscribe((data) => {
      this.listings = data;
    });
    console.log(this.listings);

    });
  }

  navpage(path : string, eventid: string = "1") {

  this.router.navigate([path], { queryParams: {id: eventid} });
}

createTestEvents() {
    for (let index = 0; index < 100; index++) {
      let event1: Event = {
        Id: index.toString(),
        Name: "level 4 ",
        Location: "Santon",
        PriceRange: "180 - 340",
        Times: "9am - 21pm",
        Rating: "4.5",
        SafetyRating: "Safe",
        ImageData: ''
      };
      this.events.push(event1);
    }
  }



}
