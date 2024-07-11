import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-email-notifications',
  templateUrl: './profile-email-notifications.component.html',
  styleUrls: ['./profile-email-notifications.component.scss'],
  standalone:true,
})
export class ProfileEmailNotificationsComponent  implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("LOG ON ONIT ")
  }

}
