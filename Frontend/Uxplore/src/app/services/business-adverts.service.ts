import { Injectable } from '@angular/core';
import { BusinessAdvert } from '../interfaces/interfaces';
import { API_BASE_URL, ANGULAR_APP_BASE_URL } from 'src/APIBaseURL';
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

  getAllAdverts(businessUserId = 0): Observable<BusinessAdvert[]> {
    const  url = `${this.business_Ads_Api_URL}?businessUserID=${businessUserId}`;
    return this.httpClient.get<BusinessAdvert[]>(url)
  }

  createPayment(amount: number): Observable<PaymentResponse>{
    const postUrl = `${this.business_Ads_Api_URL}create-payment`
    const request : PaymentRequest = {
      Amount: amount,
      ItemName : `Business_Advert`,
      ReturnUrl: `${ANGULAR_APP_BASE_URL}/business/success`,
      CancelUrl: `${ANGULAR_APP_BASE_URL}/business/cancel`,
      NotifyUrl : `${ANGULAR_APP_BASE_URL}/business/notify`,
      Signature : "",
    }
    return this.httpClient.post<PaymentResponse>(postUrl,request )
  }

  updateAdvert(ads: BusinessAdvert): Observable<BusinessAdvert>{
    const url = `${this.business_Ads_Api_URL}/${ads.id}`

    return this.httpClient.put<BusinessAdvert>(url, ads)
  }

  deleteAdvert(adID: number): Observable<BusinessAdvert>{
    const url = `${this.business_Ads_Api_URL}/${adID}`

    return this.httpClient.delete<BusinessAdvert>(url)
  }

  createCheckoutWithGUID(amount: number, guid: string) {
    const url = `${this.business_Ads_Api_URL}create-yoco-payment?guid=${guid}`;
    const body : YocoPaymentRequest = {
      Amount : amount,
      Currency: "ZAR",
      SuccessUrl: `${ANGULAR_APP_BASE_URL}/business/success`,
      CancelUrl: `${ANGULAR_APP_BASE_URL}/business/cancel`,
      FailureUrl: `${ANGULAR_APP_BASE_URL}/business/notify`,
    }
    return this.httpClient.post(url,body);
  }

  getBusinessCredits(){

  }

  getGUID() {
    const url = `${this.business_Ads_Api_URL}generate-guid`;
    return this.httpClient.get(url);
  }
}

export interface PaymentRequest{
  Amount : number,
  ItemName: string
  ReturnUrl : string,
  CancelUrl: string,
  NotifyUrl: string,
  Signature: string,
}

export interface PaymentResponse{
  PaymentUrl: string,
  PaymentRequest: PaymentRequest
}

export interface YocoPaymentRequest {
  Amount: number,
  Currency : string,
  SuccessUrl : string,
  CancelUrl : string,
  FailureUrl: string
}
