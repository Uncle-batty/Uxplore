import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, interests, UserInteraction } from '../interfaces/interfaces';
import { API_BASE_URL } from 'src/APIBaseURL';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  baseurl: string = `${API_BASE_URL}/api/Users`;
  intersteURL: string = `${API_BASE_URL}/api/User_interests`;

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
      `${API_BASE_URL}/api/User_Interactions/calender/${userId}`
    );
  }

  setInteraction(interaction: UserInteraction): Observable<UserInteraction> {
    return this.http.post<UserInteraction>(
      `${API_BASE_URL}/api/User_Interactions`,
      interaction
    );
  }

  getInteractionsOfType(type: string, userid: number, listingID: number = -1): Observable<UserInteraction[]> {
    return this.http.get<UserInteraction[]>(
      `${API_BASE_URL}/api/User_Interactions/type?interactionType=${type}&UserID=${userid}&listingID=${listingID}`
    );
  }

  deleteUserInteraction(interactionID: number): Observable<string> {
    const url = `${API_BASE_URL}/api/User_Interactions/${interactionID}`;
    return this.http.delete<string>(url);
  }
}
