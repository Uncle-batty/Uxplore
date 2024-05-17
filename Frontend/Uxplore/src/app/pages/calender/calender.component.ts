import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonRow, IonCol, IonGrid } from "@ionic/angular/standalone";

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  standalone: true,
  styleUrls: ['./calender.component.scss'],
  imports: [IonGrid, IonCol, IonRow, IonCard, CommonModule],
})
export class CalenderComponent implements OnInit {
  Month!: string;
  Day!: number;
  monthindex!: number;
  month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  days: number[][] = [
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18 ,19,20,21,22,23,24,25,26,27,28,29,30,31],
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18 ,19,20,21,22,23,24,25,26,27,28,29,30,31],
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18 ,19,20,21,22,23,24,25,26,27,28,29,30],
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18 ,19,20,21,22,23,24,25,26,27,28,29,30,31],
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18 ,19,20,21,22,23,24,25,26,27,28,29,30],
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18 ,19,20,21,22,23,24,25,26,27,28,29,30,31],
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18 ,19,20,21,22,23,24,25,26,27,28,29,30,31],
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18 ,19,20,21,22,23,24,25,26,27,28,29,30,30],
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18 ,19,20,21,22,23,24,25,26,27,28,29,31],
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18 ,19,20,21,22,23,24,25,26,27,28,29,30,30],
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18 ,19,20,21,22,23,24,25,26,27,28,29,31],
  ];

  d = new Date();

  constructor() { }

  ngOnInit() {
    this.monthindex = this.d.getMonth();
    this.Month = this.month[this.monthindex];
    this.Day = this.d.getDate(); // Corrected here
  }
}
