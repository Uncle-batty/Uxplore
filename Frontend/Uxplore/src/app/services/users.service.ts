import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, interests, UserInteraction, Email } from '../interfaces/interfaces';
import { UserSetting } from '../interfaces/interfaces';
import { API_BASE_URL } from 'src/APIBaseURL';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  baseurl: string = `${API_BASE_URL}/api/Users`;
  intersteURL: string =API_BASE_URL + '/api/User_interests';
  settingsURL: string = API_BASE_URL + '/api/User_Setting';
  settingUserIdURL:String= API_BASE_URL + '/api/User_Setting/user/'

  loginuser(email: string, password: string = "no password"): Observable<any> {
    return this.http.get<User>(
      this.baseurl + `/email/${email}?password=${password}`
    );
  }

  registeruser(user: User | undefined): Observable<any> {
    return this.http.post<User>(this.baseurl, user);
  }

  sendEmail(email: Email): Observable<User>{
    const url = this.baseurl + "/sendForgotEmail"

    return this.http.post<User>(url, email);

  }

  updateUser(user: User): Observable<any>{
    const url = this.baseurl + `/${user.id}`
    return this.http.put<any>(url, user)
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
  setUserSettings(settings: UserSetting): Observable<UserSetting> {
    return this.http.post<UserSetting>(this.settingsURL, settings);
  }
   // Updated method for getting user settings
  getUserSettings(userId: number): Observable<UserSetting> {
    return this.http.get<UserSetting>(`${this.settingsURL}/user/${userId}`);
  }

  // Updated method for updating user settings
updateUserSettingsByUserId(userId: number, settings: UserSetting): Observable<void> {
  return this.http.put<void>(`${this.settingsURL}/user/${userId}`, settings);
}


}
