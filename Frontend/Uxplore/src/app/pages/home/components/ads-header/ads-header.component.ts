import { Component, OnInit } from '@angular/core';
import { BusinessAdvert } from 'src/app/interfaces/interfaces';
import { BusinessAdvertsService } from 'src/app/services/business-adverts.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ads-header',
  standalone: true,
  templateUrl: './ads-header.component.html',
  imports: [CommonModule],
  styleUrls: ['./ads-header.component.scss'],
  providers: [BusinessAdvertsService]
})
export class AdsHeaderComponent  implements OnInit {

  constructor(private adsService: BusinessAdvertsService, private router : Router) { }

  images: BusinessAdvert[] = [
  ];

  visibleImages: BusinessAdvert[] = [];
  currentIndex: number = 0;
  intervalTime: number = 3000; // Time in ms (3 seconds)

  ngOnInit() {
    this.getAdverts()

  }

  goToListing(listingId : string) {

  }

  startCarousel() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      const nextIndex = (this.currentIndex + 1) % this.images.length;
      this.visibleImages = [this.images[this.currentIndex], this.images[nextIndex]];
    }, this.intervalTime);
  }

  async getAdverts () {
    this.adsService.getAllAdverts().subscribe((ads) => {
      this.images = ads;
      this.visibleImages = [this.images[0], this.images[1]]; // Initially show the first two images
    this.startCarousel();
      console.log("Ads :", ads )
    }, (error) => {
      console.log("Problem with getting ads.: ", error)
    })
  }

  navpage(path: string, eventId: number = 1) {
    if (eventId){
      this.router.navigate([path], { queryParams: { id: eventId } });
    }
  }
}
