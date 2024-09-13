import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { IonIcon, IonTabButton, IonLabel, IonCardSubtitle, IonCard, IonCardHeader, IonCardTitle, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { ProfileDetailsComponent } from 'src/app/profile-details/profile-details.component';
import { ProfileEmailNotificationsComponent } from 'src/app/profile-email-notifications/profile-email-notifications.component';
import { ProfileHelpCentreComponent } from 'src/app/profile-help-centre/profile-help-centre.component';
import { ProfilePushNofitcationsComponent } from 'src/app/profile-push-nofitcations/profile-push-nofitcations.component';
import { HttpClient} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { User } from 'src/app/interfaces/interfaces';
import { defaultProfileImage } from 'src/APIBaseURL';

@Component({
  standalone: true,
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.scss'],
  imports: [IonCardTitle, IonCardHeader, IonCard, IonCardSubtitle, IonLabel, IonTabButton, IonIcon, IonGrid, IonRow, IonCol, ProfileDetailsComponent, ProfilePushNofitcationsComponent, ProfileEmailNotificationsComponent, ProfileHelpCentreComponent,HttpClientModule],


})
export class BusinessProfileComponent  implements OnInit {
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;
  private componentRef!: ComponentRef<any>;
  username: string = ""
    profileImage : string = defaultProfileImage;


  constructor(private resolver: ComponentFactoryResolver,) {}

  ngOnInit() {
    this.getUser()
    console.log('ProfileComponent initialized');
    // Load the default component (ProfileDetailsComponent) when the profile component is initialized
    this.loadComponent('ProfileDetailsComponent');
  }

  getUser(){
    const user : User = JSON.parse(localStorage.getItem('user') ?? "");
    if (user){
      this.username = user.fName + " " + user.lName;
    }
  }


  loadComponent(componentName: string) {
    console.log(`Loading component: ${componentName}`);
    this.container.clear();

    let componentFactory;

    switch (componentName) {
      case 'PushNotificationsComponent':
        componentFactory = this.resolver.resolveComponentFactory(ProfilePushNofitcationsComponent);
        break;
      case 'EmailNotificationsComponent':
        componentFactory = this.resolver.resolveComponentFactory(ProfileEmailNotificationsComponent);
        break;
      case 'HelpCenterComponent':
        componentFactory = this.resolver.resolveComponentFactory(ProfileHelpCentreComponent);
        break;
      case 'ProfileDetailsComponent':
        componentFactory = this.resolver.resolveComponentFactory(ProfileDetailsComponent);
        break;
      default:
        componentFactory = this.resolver.resolveComponentFactory(ProfileDetailsComponent);
    }

    this.componentRef = this.container.createComponent(componentFactory);
    console.log(`${componentName} loaded successfully`);
  }

  togglePrivateAccount() {
    const toggle = document.querySelector('.toggle');
    if (toggle) {
      toggle.classList.toggle('toggled');
    }
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

}
