import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from 'src/APIBaseURL';
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
  API_BASE_URL = ''
  baseUrl: string = `${API_BASE_URL}/api/Listing/`;
  rateingbaseurl: string = `${API_BASE_URL}/api/Ratings/`;
  commentApi: string = `${API_BASE_URL}/api/Comments`;
  constructor(private http: HttpClient) {}

  listallbycategory(category: string): Observable<Listing[]> {
    return this.http.get<Listing[]>(
      `${API_BASE_URL}/api/Listings/byCategory/${category}`
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
      `${API_BASE_URL}/api/ListingImages/onelisting/${id}`
    );
  }

  searchlistings(term: string): Observable<Listing[]> {
    return this.http.get<Listing[]>(
      `${API_BASE_URL}/api/Listings/Search?term=${term}`
    );
  }

  getalllistings(): Observable<Listing[]> {
    return this.http.get<Listing[]>(
      `${API_BASE_URL}/api/Listing`
    );
  }

  getOneListing(listingID: number): Observable<Listing> {
    const url = `${API_BASE_URL}/api/Listing/${listingID}`;
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
