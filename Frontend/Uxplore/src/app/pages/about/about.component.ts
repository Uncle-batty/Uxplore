import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent  {

  constructor(private router: Router) { }

    navpage(path : string) {

  this.router.navigate([path]);
}



}
