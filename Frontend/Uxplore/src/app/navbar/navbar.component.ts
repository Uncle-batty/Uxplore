import { Component, OnInit } from '@angular/core';
import { IonIcon, IonTabButton, IonLabel, IonCardSubtitle, IonCard, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {megaphoneOutline, barChartOutline,  bookmarkOutline, searchOutline, homeOutline, gameControllerOutline, calendarClearOutline,notificationsOutline, logOutOutline} from 'ionicons/icons';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../interfaces/interfaces';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [IonCardTitle, IonCardHeader, IonCard, IonCardSubtitle, IonLabel, IonTabButton, IonIcon, CommonModule],
})
export class NavbarComponent implements OnInit   {
  isBusinessUser: boolean = false;
  isMobile$: Observable<boolean> = new Observable<boolean>();

    isGameModelOpen = false;
    selectedFeeling: string = '';
    feelings: { name: string; }[] = [
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
  { name: 'Energized' }
  // Add more feelings as needed
];

//giving different nav bars for either business or user
setUserNav(){
  const userString = localStorage.getItem("user") ?? "";
  const user: User = JSON.parse(userString);

  if (user.userType == "business"){
    this.isBusinessUser = true;
  }else {
    this.isBusinessUser = false;
  }
}

isNotificationsModalOpen = false;
notifications = [
  { username: 'John', activity: 'liked your post', timestamp: '5 min ago' },
  { username: 'Rocky', activity: 'commented on your photo', timestamp:'8 min ago' },
  { username: 'Kanye', activity: 'liked your comment', timestamp:'12 min ago'}
  // Add more notifications as needed
];

  constructor(private breakpointObserver: BreakpointObserver,private router: Router) {
    addIcons({  bookmarkOutline, searchOutline, homeOutline, gameControllerOutline, calendarClearOutline, notificationsOutline,logOutOutline, megaphoneOutline, barChartOutline  });
   }

   navpage(path : string) {

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

   toggleFeeling(feeling: { name: string; }) {
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
    this.isMobile$ = this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).pipe(
      map(result => result.matches)
    );

    //Shows different Nav bars for different user types
    this.setUserNav();
  }
}
