import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square } from 'ionicons/icons';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { bookmarkOutline, searchOutline, homeOutline, gameControllerOutline, calendarClearOutline,notificationsOutline,  personCircleOutline} from 'ionicons/icons';
import { IonIcon } from "@ionic/angular/standalone";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: true,
  imports: [IonIcon, CommonModule],
})
export class TabsComponent  implements OnInit {

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


   constructor(private breakpointObserver: BreakpointObserver,private router: Router) {
    addIcons({  bookmarkOutline, searchOutline, homeOutline, gameControllerOutline, calendarClearOutline, notificationsOutline, personCircleOutline });
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

   toggleFeeling(feeling: { name: string; }) {
    this.selectedFeeling = feeling.name;
  }

  submitFeelings() {
    console.log('Selected feeling:', this.selectedFeeling);
    this.closeModal();
  }
   ngOnInit(): void {
    this.isMobile$ = this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).pipe(
      map(result => result.matches)
    );
  }

}
