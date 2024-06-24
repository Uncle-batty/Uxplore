import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, interests, UserInteraction } from '../interfaces/interfaces';



@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  baseurl: string = 'https://uxploreapi.azurewebsites.net/api/Users';
  intersteURL: string = 'https://uxploreapi.azurewebsites.net/api/User_interests';
  loginuser(email: string, password: string): Observable<any> {
    return this.http.get<User>(
      this.baseurl + `/email/${email}?password=${password}`
    );
  }

  registeruser(user: User | undefined): Observable<any> {
    return this.http.post<User>(this.baseurl, user);
  }

  setuserinterests(interest: interests): Observable<any> {
    return this.http.post<interests>(this.intersteURL, interest);
  }

  getUserInteractions(userId: number): Observable<UserInteraction[]> {
    return this.http.get<UserInteraction[]>(
      `https://uxploreapi.azurewebsites.net/api/User_Interactions/calender/${userId}`
    );
  }

  setInteraction(interaction: UserInteraction): Observable<UserInteraction> {
    return this.http.post<UserInteraction>(
      `https://uxploreapi.azurewebsites.net/api/User_Interactions`,
      interaction
    );
  }

  getInteractionsOfType(type: string, userid : number, listingID : number = -1): Observable<UserInteraction[]>{
    return this.http.get<UserInteraction[]>(`https://uxploreapi.azurewebsites.net/api/User_Interactions/type?interactionType=${type}&UserID=${userid}&listingID=${listingID}`)
  }

  deleteUserInteraction(interactionID : number) : Observable<string> {
    const url = `https://uxploreapi.azurewebsites.net/api/User_Interactions/${interactionID}`;
    return this.http.delete<string>(url);
  }
}
