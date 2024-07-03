import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CalenderComponent } from './pages/calender/calender.component';
import { CategoryComponent } from './pages/category/category.component';
import { IndividualCategoryComponent } from './pages/individual-category/individual-category.component';
import { LandingComponent } from './pages/landing/landing.component';
import { AboutComponent } from './pages/about/about.component';
import { OneActivityComponent } from './pages/one-activity/one-activity.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { SavedComponent } from './pages/saved/saved.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { AuthGuard } from './services/auth.guard';// Import the guard
import { BusinessDashboardComponent } from './pages/business-dashboard/business-dashboard.component';
import { BusinessCalendarComponent } from './pages/business-calendar/business-calendar.component';
import { BusinessNotificationsComponent } from './pages/business-notifications/business-notifications.component';
import { BusinessProfileComponent } from './pages/business-profile/business-profile.component';
import { BusinessAdvertComponent } from './pages/business-advert/business-advert.component';

const userRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'calender', component: CalenderComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'individualCategory', component: IndividualCategoryComponent },
  { path: 'activity', component: OneActivityComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'saved', component: SavedComponent },
  { path: 'notifications', component: NotificationsComponent }
];



const mainRoutes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'landing', component: LandingComponent },
];

const businessComponent: Routes = [
  { path: 'business-dashboard', component: BusinessDashboardComponent },
  { path: 'business-calendar', component: BusinessCalendarComponent },
  { path: 'business-notifications', component: BusinessNotificationsComponent },
  { path: 'business-profile', component: BusinessProfileComponent },
  { path: 'business-advert', component: BusinessAdvertComponent }
];

export const routes: Routes = [
  { path: 'user', children: userRoutes },
  { path: 'main', children: mainRoutes },
  { path: 'business', children: businessComponent },
  { path: '', canActivate: [AuthGuard], children: [] }, // Use the guard for the root path
  { path: '**', canActivate: [AuthGuard], children: [] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
