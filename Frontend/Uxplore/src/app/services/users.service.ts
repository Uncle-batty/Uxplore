import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/interfaces';
import { interests } from '../interfaces/interfaces';
import { UserInteraction } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  baseurl: string = 'https://localhost:7088/api/Users';
  intersteURL: string = 'https://localhost:7088/api/User_interests';
  loginuser(email: string): Observable<any> {
    return this.http.get<User>(this.baseurl + `/email/${email}`);
  }

  registeruser(user: User | undefined): Observable<any> {
    return this.http.post<User>(this.baseurl, user);
  }

  setuserinterests(interest: interests): Observable<any> {
    return this.http.post<interests>(this.intersteURL, interest);
  }

  getUserInteractions(userId: number): Observable<UserInteraction[]> {
    return this.http.get<UserInteraction[]>(
      `https://localhost:7088/api/User_Interactions/calender/${userId}`
    );
  }
}
