import { Component, OnInit, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EventCardComponent } from 'src/app/event-card/event-card.component';
import { Event } from 'src/Models/event-card';
import { CommonModule } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-individual-category',
  standalone: true,
  templateUrl: './individual-category.component.html',
  styleUrls: ['./individual-category.component.scss'],
  imports: [EventCardComponent,CommonModule]
})
export class IndividualCategoryComponent  implements OnInit {
  events: Event[] = [];
  categoryName : string = "Category Name"
  @Input() bannerImage:string = ""
  constructor(private router: Router) {

  }

  ngOnInit() {
    this.createTestEvents();
    this.bannerImage = `url("../../../assets/dateNightBGIMG.jpg") no-repeat center center fixed`
  }

  navpage(path : string) {

  this.router.navigate([path]);
}

createTestEvents() {
    for (let index = 0; index < 6; index++) {
      let event1: Event = {
        Id: index.toString(),
        Name: "RocoMamas",
        Location: "Campus Square",
        PriceRange: "70 - 250",
        Times: "9am - 7pm",
        Rating: "4",
        SafetyRating: "Safe",
        ImageData: ''
      };
      this.events.push(event1);
    }
  }



}
