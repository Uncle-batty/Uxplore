import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  loginuser(id : any): Observable<any> {
    return this.http.get<any>(`https://localhost:7088/api/Users/{id}`);
  }
}
