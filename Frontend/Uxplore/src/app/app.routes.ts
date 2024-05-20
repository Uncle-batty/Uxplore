// app-routing.module.ts

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { Tab1Page } from './tab1/tab1.page';
import { Tab2Page } from './tab2/tab2.page';
import { Tab3Page } from './tab3/tab3.page';
import { CalenderComponent } from './pages/calender/calender.component';
import { CategoryComponent } from './pages/category/category.component';
import { IndividualCategoryComponent } from './pages/individual-category/individual-category.component';
import { LandingComponent } from './pages/landing/landing.component';
import { AboutComponent } from './pages/about/about.component';


const userRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  {path: 'calender', component: CalenderComponent},
  {path : 'category', component: CategoryComponent},
  {path : 'individualCategory', component: IndividualCategoryComponent},
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
