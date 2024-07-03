import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Listing,
  rateing,
  listingimages,
  Comment,
} from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ListingsService {
  baseUrl: string = 'https://uxploreapi.azurewebsites.net/api/Listing/';
  rateingbaseurl: string = 'https://uxploreapi.azurewebsites.net/api/Ratings/';
  commentApi: string = 'https://uxploreapi.azurewebsites.net/api/Comments';
  constructor(private http: HttpClient) {}

  listallbycategory(category: string): Observable<Listing[]> {
    return this.http.get<Listing[]>(
      `https://uxploreapi.azurewebsites.net/api/Listings/byCategory/${category}`
    );
  }

  listoneactivity(activity: number | undefined): Observable<Listing> {
    return this.http.get<Listing>(`${this.baseUrl}${activity}`);
  }

  getactivityrateings(id: number): Observable<rateing[]> {
    return this.http.get<rateing[]>(this.rateingbaseurl + `listing/${id}`);
  }

  getlistingimages(id: number): Observable<listingimages[]> {
    return this.http.get<listingimages[]>(
      `https://uxploreapi.azurewebsites.net/api/ListingImages/onelisting/${id}`
    );
  }

  searchlistings(term: string): Observable<Listing[]> {
    return this.http.get<Listing[]>(
      `https://uxploreapi.azurewebsites.net/api/Listings/Search?term=${term}`
    );
  }

  getalllistings(): Observable<Listing[]> {
    return this.http.get<Listing[]>(
      `https://uxploreapi.azurewebsites.net/api/Listing`
    );
  }

  getOneListing(listingID: number): Observable<Listing> {
    const url = `https://uxploreapi.azurewebsites.net/api/Listing/${listingID}`;
    return this.http.get<Listing>(url);
  }

  addrateings(Rateing: rateing): Observable<rateing> {
    return this.http.post<rateing>(this.rateingbaseurl, Rateing);
  }

  addcomments(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.commentApi, comment);
  }

  getactcomment(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.commentApi}/listing/${id}`);
  }

  getWether(long: number, lat: number): Observable<any> {
    return this.http.get<any>(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=temperature_2m_max,temperature_2m_min`
    );
  }
}
