import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { arrowForwardCircleOutline } from 'ionicons/icons';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ExploreComponent implements OnInit {
  constructor(private router: Router) {}

  navpage(path : string) {

  this.router.navigate([path]);
}

  ngOnInit() {
    addIcons({
      'arrow-forward-circle-outline': arrowForwardCircleOutline
    });
  }
}
