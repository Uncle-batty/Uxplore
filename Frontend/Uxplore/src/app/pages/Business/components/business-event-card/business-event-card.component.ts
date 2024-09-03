import { Event } from './../../../../../Models/event-card';
import { ListingsService } from './../../../../services/listings.service';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Listing, listingimages } from '../../../../interfaces/interfaces';
import {defaultImage} from '../../../../../APIBaseURL'

@Component({
  selector: 'app-business-event-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './business-event-card.component.html',
  styleUrls: ['./business-event-card.component.scss'],
  providers: [ListingsService]
})
export class BusinessEventCardComponent  implements OnInit {
  @Input() Event!:Listing ;
  listingImage!: listingimages;
  constructor(
    private listingsService: ListingsService
  ) { }

  ngOnInit() {
    this.getListingImages()
  }

  getListingImages(){
    this.listingsService.getlistingimages(this.Event.id).subscribe((listingImages) => {
      if (listingImages.length > 0){
        console.log("Image: ", listingImages)
        this.listingImage = listingImages[0];
      }else {
        let newListingImage : listingimages = {
          id : 0,
          listingid: 0,
          image: defaultImage
        }
          this.listingImage = newListingImage;
      }
    })
  }

}
