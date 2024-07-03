import { Component, OnInit } from '@angular/core';
import { IonIcon, IonTabButton, IonLabel, IonCardSubtitle, IonCard, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { bookmarkOutline, searchOutline, homeOutline, gameControllerOutline, calendarClearOutline,notificationsOutline, logOutOutline} from 'ionicons/icons';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { SavedComponent } from '../pages/saved/saved.component';
import { EventCardComponent } from '../event-card/event-card.component';
import { Event } from 'src/Models/event-card';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonCardSubtitle,
    IonLabel,
    IonTabButton,
    IonIcon,
    CommonModule,
    SavedComponent,
    EventCardComponent,
  ],
})
export class NavbarComponent implements OnInit {
  isMobile$: Observable<boolean> = new Observable<boolean>();
  isbuisness: boolean = true;
  isGameModelOpen = false;
  selectedFeeling: string = '';
  events: Event[] = [];
  categoryName: string = 'Item-Saved';
  feelings: { name: string }[] = [
    { name: 'Happy' },
    { name: 'Sad' },
    { name: 'Excited' },
    { name: 'Angry' },
    { name: 'Confused' },
    { name: 'Content' },
    { name: 'Grateful' },
    { name: 'Hopeful' },
    { name: 'Relaxed' },
    { name: 'Stressed' },
    { name: 'Surprised' },
    { name: 'Proud' },
    { name: 'Loved' },
    { name: 'Lonely' },
    { name: 'Disappointed' },
    { name: 'Frustrated' },
    { name: 'Optimistic' },
    { name: 'Anxious' },
    { name: 'Bored' },
    { name: 'Energized' },
    // Add more feelings as needed
  ];
  removeNotification(index: number) {
    if (index >= 0 && index < this.notifications.length) {
      this.notifications.splice(index, 1);
      this.router.navigate(['/user/activity']);
    }
  }
  isNotificationsModalOpen = false;
  notifications = [
    {
      username: 'RocoMamas',
      activity: 'increased the wing challenge prices',
      timestamp: '5 min ago',
    },
    {
      username: 'Wimpy',
      activity: 'has only 3 days left for their burger special',
      timestamp: '8 min ago',
    },
    {
      username: 'Ama Zwing Zwing',
      activity: 'has a buy-1-get-1-free ticket promo',
      timestamp: '12 min ago',
    },
    // Add more notifications as needed
  ];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private route: ActivatedRoute
  ) {
    addIcons({
      bookmarkOutline,
      searchOutline,
      homeOutline,
      gameControllerOutline,
      calendarClearOutline,
      notificationsOutline,
      logOutOutline,
    });
  }

  navpage(path: string) {
    this.router.navigate([path]);
  }
  openModal() {
    this.isGameModelOpen = true;
  }

  closeModal() {
    this.isGameModelOpen = false;
  }

  openNotificationsModal() {
    this.isNotificationsModalOpen = true;
  }

  closeNotificationsModal() {
    this.isNotificationsModalOpen = false;
  }

  toggleFeeling(feeling: { name: string }) {
    this.selectedFeeling = feeling.name;
  }

  submitFeelings() {
    console.log('Selected feeling:', this.selectedFeeling);
    this.closeModal();
  }
  logout() {
    localStorage.removeItem('user');
    this.navpage('/main/landing');
  }
  ngOnInit(): void {
    this.isMobile$ = this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(map((result) => result.matches));
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isbuisness = !this.router.url.includes('business');
      });
  }
}
