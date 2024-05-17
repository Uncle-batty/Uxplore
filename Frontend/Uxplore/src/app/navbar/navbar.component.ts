import { Component, OnInit } from '@angular/core';
import { IonIcon, IonTabButton, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { bookmarkOutline, searchOutline, homeOutline, gameControllerOutline, calendarClearOutline,notificationsOutline} from 'ionicons/icons';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
   standalone: true,
   imports: [IonLabel, IonTabButton, IonIcon, CommonModule],
})
export class NavbarComponent implements OnInit   {

   isMobile$: Observable<boolean> = new Observable<boolean>();

  constructor(private breakpointObserver: BreakpointObserver,private router: Router) {
    addIcons({  bookmarkOutline, searchOutline, homeOutline, gameControllerOutline, calendarClearOutline, notificationsOutline  });
   }

   navpage(path : string) {

  this.router.navigate([path]);
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
