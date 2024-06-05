import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Listing, rateing, listingimages } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ListingsService {
 baseUrl: string = 'https://localhost:7088/api/Listing/';
 rateingbaseurl: string = 'https://localhost:7088/api/Ratings/';
  constructor(private http: HttpClient) { }

  listallbycategory(category: string): Observable<Listing[]> {
    return this.http.get<Listing[]>(`https://localhost:7088/api/Listings/byCategory/${category}`);
  }

  listoneactivity(activity: number|undefined): Observable<Listing> {
    return this.http.get<Listing>(`${this.baseUrl}${activity}`);
  }

  getactivityrateings(id: number): Observable<rateing[]> {
    return this.http.get<rateing[]>(this.rateingbaseurl+`listing/${id}`);
  }

  getlistingimages(id: number): Observable<listingimages[]> {
   return this.http.get<listingimages[]>(`https://localhost:7088/api/ListingImages/onelisting/${id}`);
  }

  searchlistings(term: string): Observable<Listing[]> {
    return this.http.get<Listing[]>(`https://localhost:7088/api/Listings/Search?term=${term}`);
  }

  getalllistings(): Observable<Listing[]> {
    return this.http.get<Listing[]>(`https://localhost:7088/api/Listing`);
  }
}
