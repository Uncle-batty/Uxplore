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
  day!: number;
  monthIndex!: number;
  currentYear!: number;
  currentDate!: number;
  weeks: (number | null)[][] = [];
  monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  constructor() { }

  ngOnInit() {
    const today = new Date();
    this.monthIndex = today.getMonth();
    this.currentYear = today.getFullYear();
    this.currentDate = today.getDate();
    this.Month = this.monthNames[this.monthIndex];
    this.generateCalendar(this.monthIndex, this.currentYear);
}

  generateCalendar(monthIndex: number, year: number) {
    this.weeks = [];
    const firstDay = new Date(year, monthIndex, 1).getDay();
    const daysInMonth = this.daysInMonth[monthIndex];
    let week: (number | null)[] = new Array(firstDay).fill(null);

    for (let day = 1; day <= daysInMonth; day++) {
      week.push(day);
      if (week.length === 7) {
        this.weeks.push(week);
        week = [];
      }
    }

    if (week.length > 0) {
      while (week.length < 7) {
        week.push(null);
      }
      this.weeks.push(week);
    }
  }

  isCurrentDay(day: number | null): boolean {
    return day === this.currentDate && this.monthIndex === new Date().getMonth() && this.currentYear === new Date().getFullYear();
  }
}
