import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Listing } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ListingsService {
 baseUrl: string = 'https://localhost:7088/api/Listing/'
  constructor(private http: HttpClient) { }

  listallbycategory(category: string): Observable<Listing[]> {
    return this.http.get<Listing[]>(`https://localhost:7088/api/Listings/byCategory/${category}`);
  }

  listoneactivity(activity: number|undefined): Observable<Listing> {
    return this.http.get<Listing>(`${this.baseUrl}${activity}`);
  }
}
