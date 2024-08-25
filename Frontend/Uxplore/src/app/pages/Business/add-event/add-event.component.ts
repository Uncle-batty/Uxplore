import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Listing, listingimages } from 'src/app/interfaces/interfaces';
import { ListingsService } from 'src/app/services/listings.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
    standalone: true,
  styleUrls: ['./add-event.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
})

export class AddEventComponent  implements OnInit {
constructor(private listingsService: ListingsService) { }

  ListingImage: string= "";
eventName: string = '';
  startDate: string = ''; // Separate start and end dates
  endDate: string = '';
  weekdayHours: string = '';
  weekendHours: string = '';
  holidayHours: string = '';
  location: string = '';
  description: string = '';
  bookingRequired: boolean = false;
  minPrice: number = 0;
  maxPrice: number = 0;
  publicCell: string = '';
  publicEmail: string = '';
  link: string = '';
  uploadedFiles: File[] = [];


onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;

  if (input.files && input.files.length > 0) {
    this.uploadedFiles = Array.from(input.files); // Store all selected files
  }
}


  ngOnInit() {}


onSubmit(): void {
  const listing: Listing ={
    id: 0,
    name: this.eventName,
    description: this.description,
    hours: `${this.weekdayHours} (Weekday), ${this.weekendHours} (Weekend), ${this.holidayHours} (Holiday)`,
    location: this.location,
    phone: this.publicCell,
    email: this.publicEmail,
    order: '',  // Optional or as per your logic
    reserve: this.bookingRequired ? 1 : 0, // Assuming 1 means 'Yes', 0 means 'No'
    start_date: this.startDate, // Start date
    end_date: this.endDate, // Optional or as per your logic
    site: this.link,
    min_price: this.minPrice,
    max_price: this.maxPrice,
    user_id: 0, // Assuming you're setting this later or retrieving it from somewhere else
    avG_price: (this.minPrice + this.maxPrice) / 2 // Calculate average price
  };

  this.listingsService.addListing(listing).subscribe({
    next: (response) => {
      console.log('Listing added successfully', response);

      // Loop through each uploaded file and upload it
      if (this.uploadedFiles && this.uploadedFiles.length > 0) {
        this.uploadedFiles.forEach(file => {
          const reader = new FileReader();

          reader.onload = (e: any) => {
            const image: listingimages = {
              id : 0,
              listingid: response.id,
              image: e.target.result // Base64 string of the image
            };

            this.listingsService.addlistingimage(image).subscribe({
              next: (response2) => {
                console.log('Listing image added successfully', response2);
              },
              error: (error) => {
                console.error('Error adding listing image', error);
                // Handle the error (e.g., display a notification)
              }
            });
          };

          reader.readAsDataURL(file); // Converts the file to a base64 string
        });
      }
    },
    error: (error) => {
      console.error('Error adding listing', error);
      // Handle the error (e.g., display a notification)
    }
  });
}




}
