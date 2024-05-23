import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) { }

  loginuser(email: string): Observable<any> {
    return this.http.get<User>(`https://localhost:7088/api/Users/email/${email}`);
  }
}
