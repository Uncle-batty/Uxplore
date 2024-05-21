// app-routing.module.ts

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


const userRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  {path: 'calender', component: CalenderComponent},
  {path : 'category', component: CategoryComponent},
  {path : 'individualCategory', component: IndividualCategoryComponent},
  {path : 'activity', component: OneActivityComponent},
  {path : 'explore', component: ExploreComponent}
];

const mainRoutes: Routes = [
{ path: 'about', component: AboutComponent},
   {path: 'landing', component: LandingComponent},
];
const businessComponent: Routes = [];
export const routes: Routes = [
  {path: 'user', children: userRoutes},
  {path: 'main', children: mainRoutes},
  {path: 'business', children: businessComponent},
  { path: '', redirectTo: '/main', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
