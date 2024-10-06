import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { UsersService } from '../services/users.service';
import { UserSetting } from '../interfaces/interfaces';

@Component({
  selector: 'app-profile-push-notifications',
  templateUrl: './profile-push-nofitcations.component.html',
  styleUrls: ['./profile-push-nofitcations.component.scss'],
  standalone: true,
  imports: [CommonModule] // Import CommonModule to use async pipe
})
export class ProfilePushNofitcationsComponent implements OnInit {
  userId: number = 0; // Default value; will be updated in ngOnInit
  userSettings$: Observable<UserSetting> = of();

  constructor(private UsersService: UsersService) { }

  ngOnInit() {
    this.userId = this.getUserIdFromLocalStorage();
    if (this.userId) {
      this.loadUserSettings();
    }
  }

  getUserIdFromLocalStorage(): number {
    const userFromStorage = JSON.parse(localStorage.getItem('user') || '{}');
    return userFromStorage.id; // Assuming the ID is stored in the 'id' property
  }

  loadUserSettings() {
    this.userSettings$ = this.UsersService.getUserSettings(this.userId);
  }

  updateSettings(setting: string, value: number) {
  this.userSettings$.subscribe(settings => {
    const updatedSettings = { ...settings, [setting]: value };
    this.UsersService.updateUserSettingsByUserId(this.userId, updatedSettings).subscribe(() => {
      // Reload settings after update to reflect changes
      this.loadUserSettings();
    });
  });
}

}
