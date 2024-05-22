import { EventCardComponent } from 'src/app/event-card/event-card.component';
import { Component, OnInit, input } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from 'src/Models/event-card';
import { CommonModule } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { ActivatedRoute } from '@angular/router';
import { query } from '@angular/animations';


@Component({
  selector: 'app-saved',
  standalone: true,
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss'],
  imports: [EventCardComponent, CommonModule],
})
export class SavedComponent implements OnInit {
  events: Event[] = [];
  categoryName: string = 'Item-Saved';

  constructor(private router: Router, private route: ActivatedRoute) {}

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
    for (let index = 0; index < 12; index++) {
      let event: Event = {
        Id: index.toString(),
        Name: 'level 4 ',
        Location: 'Santon',
        PriceRange: '180 - 340',
        Times: '9am - 21pm',
        Rating: '4.5',
        SafetyRating: 'Safe',
        ImageData: '',
      };
      this.events.push(event);
    }
  }
}
