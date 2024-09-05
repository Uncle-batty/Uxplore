import { ListingsService } from './../../../services/listings.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Listing, listingimages, User } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  standalone: true,
  styleUrls: ['./add-event.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
})

export class AddEventComponent implements OnInit {
  constructor(private listingsService: ListingsService) { }

  ListingImage: string = "";
  eventName: string = '';
  startDate: string = '';
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

  events: Listing[] = [];

  paginatedEvents: Listing[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  businessID: number = 0;

  ngOnInit() {

    this.getUser();
    this.getalllistings();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.uploadedFiles = Array.from(input.files);
    }
  }

  onSubmit(): void {
    const listing: Listing = {
      id: 0,
      name: this.eventName,
      description: this.description,
      hours: `${this.weekdayHours} (Weekday), ${this.weekendHours} (Weekend), ${this.holidayHours} (Holiday)`,
      location: this.location,
      phone: this.publicCell,
      email: this.publicEmail,
      order: '',
      reserve: this.bookingRequired ? 1 : 0,
      start_date: this.startDate,
      end_date: this.endDate,
      site: this.link,
      min_price: this.minPrice,
      max_price: this.maxPrice,
      user_id: 0,
      avG_price: (this.minPrice + this.maxPrice) / 2
    };

    this.listingsService.addListing(listing).subscribe({
      next: (response) => {
        console.log('Listing added successfully', response);

        if (this.uploadedFiles && this.uploadedFiles.length > 0) {
          this.uploadedFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e: any) => {
              const image: listingimages = {
                id: 0,
                listingid: response.id ?? 0,
                image: e.target.result
              };
              this.listingsService.addlistingimage(image).subscribe({
                next: (response2) => {
                  console.log('Listing image added successfully', response2);
                },
                error: (error) => {
                  console.error('Error adding listing image', error);
                }
              });
            };
            reader.readAsDataURL(file);
          });
        }
      },
      error: (error) => {
        console.error('Error adding listing', error);
      }
    });
  }

    getUser () {
    const userString = localStorage.getItem('user') ?? "";
    const user : User = JSON.parse(userString) ?? '';
    this.businessID = user.id ?? 0
    console.log(this.businessID);

  }

    getalllistings() {
      this.listingsService.getalllistings(0).subscribe(
        (data: Listing[]) => {

          this.events = data;
          this.updatePagination();
        },
        (error) => {
          console.error('Error fetching listings:', error);
        }
      );
    }


  updatePagination() {
    this.totalPages = Math.ceil(this.events.length / this.itemsPerPage);
    this.paginatedEvents = this.events.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

onEdit(event: Listing) {
  this.eventName = event.name;
  this.startDate = event.start_date;
  this.endDate = event.end_date || '';
  this.location = event.location;
  this.description = event.description;
  this.minPrice = event.min_price;
  this.maxPrice = event.max_price;
  this.publicCell = event.phone;
  this.publicEmail = event.email;
  this.link = event.site;
}


  onDelete(eventId: number) {
    this.events = this.events.filter(event => event.id !== eventId);
    this.updatePagination();
  }
}
