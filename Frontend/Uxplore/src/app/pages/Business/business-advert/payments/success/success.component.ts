import { Component, OnInit } from '@angular/core';
import { BusinessCredits, User } from 'src/app/interfaces/interfaces';
import { BusinessAdvertsService } from 'src/app/services/business-adverts.service';
import { addIcons } from "ionicons";

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [],
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
  providers: [BusinessAdvertsService]
})
export class SuccessComponent  implements OnInit {

  constructor(
    private adsService: BusinessAdvertsService
  ) { }

  ngOnInit() {}

  postNewCredits(){
    const user : User = JSON.parse(localStorage.getItem('user') ?? "");
    const creditsAmount : number = Number(localStorage.getItem('credits') ?? "0");

    this.adsService.getBusinessCredits(user.id ?? 0).subscribe((credits) => {
      if (credits.length != 0){
        const newCredits : BusinessCredits = {
          id: 0,
          User_ID : user.id ?? 0,
          Available_Credits : creditsAmount
        }
        this.adsService.addNewBusinessCredits(newCredits).subscribe((res) => {
          console.log(res);
        })
      }else  {
        const newCredits : BusinessCredits = {
          id: credits[0].id,
          User_ID: credits[0].User_ID,
          Available_Credits: creditsAmount
        }

        this.adsService.updateBusinessCredits(newCredits).subscribe((res) => {
          console.log(res);
        })
      }
    })
  }
}
