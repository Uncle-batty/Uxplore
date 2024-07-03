import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonRow, IonCol, IonGrid } from '@ionic/angular/standalone';
import { UsersService } from 'src/app/services/users.service';
import { ListingsService } from 'src/app/services/listings.service';
import { Listing, UserInteraction } from 'src/app/interfaces/interfaces';
import { Observable, forkJoin } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-business-calendar',
  templateUrl: './business-calendar.component.html',
  styleUrls: ['./business-calendar.component.scss'],
  imports: [IonGrid, IonCol, IonRow, IonCard, CommonModule, HttpClientModule],
  standalone: true,
  providers: [ListingsService, UsersService],
})
export class BusinessCalendarComponent  implements OnInit {
  Month!: string;
  day!: number;
  monthIndex!: number;
  currentYear!: number;
  currentDate!: number;
  weeks: (number | null)[][] = [];
  monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  events: { [key: number]: string[] } = {};

  constructor(
    private usersService: UsersService,
    private listingsService: ListingsService
  ) {}

  ngOnInit() {
    const today = new Date();
    this.monthIndex = today.getMonth();
    this.currentYear = today.getFullYear();
    this.currentDate = today.getDate();
    this.Month = this.monthNames[this.monthIndex];
    this.generateCalendar(this.monthIndex, this.currentYear);
    this.loadEvents();
  }

  generateCalendar(monthIndex: number, year: number) {
    this.weeks = [];
    const firstDay = new Date(year, monthIndex, 1).getDay();
    const daysInMonth = this.daysInMonth[monthIndex];
    let week: (number | null)[] = new Array(firstDay).fill(null);

    for (let day = 1; day <= daysInMonth; day++) {
      week.push(day);
      if (week.length === 7) {
        this.weeks.push(week);
        week = [];
      }
    }

    if (week.length > 0) {
      while (week.length < 7) {
        week.push(null);
      }
      this.weeks.push(week);
    }
  }

  loadEvents() {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      const userId = user.id;
      // Now you can use userId

      this.usersService
        .getUserInteractions(userId)
        .pipe(
          switchMap((interactions: UserInteraction[]) => {
            console.log('User Interactions:', interactions); // Debug log

            if (!Array.isArray(interactions)) {
              throw new Error('Expected an array of interactions');
            }

            const eventsByDate: { [key: number]: Observable<string>[] } = {};

            interactions.forEach((interaction) => {
              const eventDate = new Date(
                interaction.interaction_Date
              ).getDate();
              if (!eventsByDate[eventDate]) {
                eventsByDate[eventDate] = [];
              }

              eventsByDate[eventDate].push(
                this.listingsService
                  .listoneactivity(interaction.listing_ID)
                  .pipe(map((listing: Listing) => listing.name))
              );
            });

            const eventObservables = Object.keys(eventsByDate).map((date) => {
              return forkJoin(eventsByDate[+date]).pipe(
                map((names: string[]) => ({ date: +date, names }))
              );
            });

            return forkJoin(eventObservables);
          })
        )
        .subscribe(
          (events: { date: number; names: string[] }[]) => {
            events.forEach((event) => {
              this.events[event.date] = event.names;
            });
          },
          (error) => {
            console.error('Error loading events:', error); // Error handling
          }
        );
    } else {
      console.error('No user found in localStorage');
    }
  }

  isCurrentDay(day: number | null): boolean {
    return (
      day === this.currentDate &&
      this.monthIndex === new Date().getMonth() &&
      this.currentYear === new Date().getFullYear()
    );
  }
}
