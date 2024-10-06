import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/interfaces';
import { API_BASE_URL } from 'src/APIBaseURL';
@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  private baseurl: string = 'https://localhost:44315/api/Users';

  constructor(private http: HttpClient) {}

updateUserDetails(userId: number, user: User): Observable<User> {
  
    return this.http.put<User>(`${this.baseurl}/${userId}`, user);
}

}
 