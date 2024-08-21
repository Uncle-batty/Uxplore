import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfilePushNofitcationsComponent } from './profile-push-nofitcations.component';

describe('ProfilePushNofitcationsComponent', () => {
  let component: ProfilePushNofitcationsComponent;
  let fixture: ComponentFixture<ProfilePushNofitcationsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePushNofitcationsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilePushNofitcationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
