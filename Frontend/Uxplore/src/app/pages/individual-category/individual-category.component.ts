import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EventCardComponent } from 'src/app/event-card/event-card.component';
@Component({
  selector: 'app-individual-category',
  standalone: true,
  templateUrl: './individual-category.component.html',
  styleUrls: ['./individual-category.component.scss'],
  imports: [EventCardComponent]
})
export class IndividualCategoryComponent  implements OnInit {

  constructor(private router: Router) {

  }

  ngOnInit() {}

  navpage(path : string) {

  this.router.navigate([path]);
}

}
