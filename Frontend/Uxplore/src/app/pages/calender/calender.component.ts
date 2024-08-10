import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonCard,
  IonRow,
  IonCol,
  IonGrid,
  IonModal, IonContent } from '@ionic/angular/standalone';
import { UsersService } from 'src/app/services/users.service';
import { ListingsService } from 'src/app/services/listings.service';
import { Listing, UserInteraction } from 'src/app/interfaces/interfaces';
import { Observable, forkJoin } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http';
import { Geolocation } from '@capacitor/geolocation';


@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  standalone: true,
  styleUrls: ['./calender.component.scss'],
  imports: [IonContent,
    IonGrid,
    IonCol,
    IonRow,
    IonCard,
    IonModal,
    CommonModule,
    HttpClientModule,
  ],
  providers: [ListingsService, UsersService],
})
export class CalenderComponent implements OnInit {
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
  userLat: number = 0;
  userLon: number = 0;
  weatherData: any[] = [];

  isModalOpen = false;
  selectedDay: number | null = null;

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
    this.getUserLocation();
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
      this.loadWeatherData();
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


  loadWeatherData() {
    this.listingsService.getWether(this.userLat, this.userLon).subscribe(
      (data: any) => {
        console.log('Weather data received:', data); // Log the data for debugging

        if (
          data.daily &&
          data.daily.time &&
          data.daily.temperature_2m_max &&
          data.daily.temperature_2m_min
        ) {
          this.weatherData = data.daily.time.map(
            (time: string, index: number) => ({
              date: time,
              maxTemperature: data.daily.temperature_2m_max[index],
              minTemperature: data.daily.temperature_2m_min[index],
            })
          );
        } else {
          console.error('Incomplete weather data received:', data);
          this.weatherData = []; // Set an empty array to avoid undefined issues in the template
        }
      },
      (error) => {
        console.error('Error fetching weather data:', error);
      }
    );
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
      this.usersService
        .getUserInteractions(userId)
        .pipe(
          switchMap((interactions: UserInteraction[]) => {
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
            console.error('Error loading events:', error);
          }
        );
    } else {
      console.error('No user found in localStorage');
    }
  }

  openDayPopup(day: number | null) {
    if (day && this.events[day]) {
      this.selectedDay = day;
      this.isModalOpen = true;
    }
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedDay = null;
  }

  isCurrentDay(day: number | null): boolean {
    return (
      day === this.currentDate &&
      this.monthIndex === new Date().getMonth() &&
      this.currentYear === new Date().getFullYear()
    );
  }
}
