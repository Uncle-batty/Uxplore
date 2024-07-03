import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { TabsComponent } from './tabs/tabs.component';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [CommonModule, IonicModule, NavbarComponent, TabsComponent],
})
export class AppComponent implements OnInit {
  showNavbarAndTabs = true;

  constructor(private router: Router) {}

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      this.router.navigate(['/user/home']);
    } else {
      this.router.navigate(['/main/landing']);
    }
/* Don't know if this side of the code is right */
    const business = localStorage.getItem('business')
    if (business) {
      this.router.navigate(['/business/business-dashboard'])
    }else{
      this.router.navigate(['/main/landing'])
    }

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.showNavbarAndTabs = !this.router.url.includes('main');
      });
  }
}
