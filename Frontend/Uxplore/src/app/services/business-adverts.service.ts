import { Injectable } from '@angular/core';
import { BusinessAdvert } from '../interfaces/interfaces';
import { API_BASE_URL } from 'src/APIBaseURL';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BusinessAdvertsService {

  constructor(private httpClient: HttpClient ) { }

  business_Ads_Api_URL = `${API_BASE_URL}/api/Business_Adverts_/`

  postAd(ad: BusinessAdvert): Observable<BusinessAdvert>{
    const url = this.business_Ads_Api_URL
    console.log("About to post business: ", ad);
    return this.httpClient.post<BusinessAdvert>(url , ad)
  }

  getAllAdverts(): Observable<BusinessAdvert[]> {
    const  url = this.business_Ads_Api_URL;
    return this.httpClient.get<BusinessAdvert[]>(url)
  }
}
