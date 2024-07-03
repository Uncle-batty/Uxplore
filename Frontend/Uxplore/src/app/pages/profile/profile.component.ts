import { ProfileHelpCentreComponent } from './../../profile-help-centre/profile-help-centre.component';
import { ProfilePushNofitcationsComponent } from './../../profile-push-nofitcations/profile-push-nofitcations.component';
import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { IonIcon, IonTabButton, IonLabel, IonCardSubtitle, IonCard, IonCardHeader, IonCardTitle,IonGrid,IonRow,IonCol } from '@ionic/angular/standalone';
import { ProfileDetailsComponent } from 'src/app/profile-details/profile-details.component';
import { ProfileEmailNotificationsComponent } from 'src/app/profile-email-notifications/profile-email-notifications.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone:true,
   imports: [IonCardTitle, IonCardHeader, IonCard, IonCardSubtitle, IonLabel, IonTabButton, IonIcon,IonGrid,IonRow,IonCol,ProfileDetailsComponent,ProfilePushNofitcationsComponent]
})
export class ProfileComponent {
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;
  private componentRef!: ComponentRef<any>;

  constructor(private resolver: ComponentFactoryResolver) {}

  ngOnInit() {
    // Load the default component (ProfileDetailsComponent) when the profile component is initialized
    this.loadComponent('ProfileDetailsComponent');
  }

  loadComponent(componentName: string) {
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
      case 'ProfileDetails':
        componentFactory=this.resolver.resolveComponentFactory(ProfileDetailsComponent)
        break;
      default:
        componentFactory = this.resolver.resolveComponentFactory(ProfileDetailsComponent);
    }

    this.componentRef = this.container.createComponent(componentFactory);
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
