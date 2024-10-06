import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ProfileComponent } from './profile.component';
import { ProfileDetailsComponent } from 'src/app/profile-details/profile-details.component';
import { ProfilePushNofitcationsComponent } from 'src/app/profile-push-nofitcations/profile-push-nofitcations.component';
import { ProfileEmailNotificationsComponent } from 'src/app/profile-email-notifications/profile-email-notifications.component';
import { ProfileHelpCentreComponent } from 'src/app/profile-help-centre/profile-help-centre.component';
import { ComponentFactoryResolver } from '@angular/core';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ComponentFactoryResolver, useValue: jasmine.createSpyObj('ComponentFactoryResolver', ['resolveComponentFactory']) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load ProfileDetailsComponent on edit profile button click', () => {
    spyOn(component, 'loadComponent');
    const button = fixture.debugElement.nativeElement.querySelector('.edit-profile-button');
    button.click();
    fixture.detectChanges();
    expect(component.loadComponent).toHaveBeenCalledWith('ProfileDetailsComponent');
  });
});
