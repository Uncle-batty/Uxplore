import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { TabsComponent } from './tabs/tabs.component';
import { IonicModule } from '@ionic/angular';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfilePushNofitcationsComponent } from './profile-push-nofitcations/profile-push-nofitcations.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { ProfileHelpCentreComponent } from './profile-help-centre/profile-help-centre.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [CommonModule, IonicModule, NavbarComponent, TabsComponent,HttpClientModule],
})
export class AppComponent implements OnInit {
  showNavbarAndTabs = true;

  constructor(private router: Router) {}

  ngOnInit() {
    // const user = localStorage.getItem('user');
    // if (user) {
    //   this.router.navigate(['/user/home']);
    // } else {
    //   this.router.navigate(['/main/landing']);
    // }

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.showNavbarAndTabs = !this.router.url.includes('main');
      });
  }
}
