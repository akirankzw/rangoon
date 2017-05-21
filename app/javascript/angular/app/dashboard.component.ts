import { Component, OnInit } from '@angular/core';
import { MdCheckboxModule } from '@angular/material';

import { Lesson } from './lesson';
import { LessonService } from './lesson.service';

import * as moment from 'moment';

@Component({
  selector: 'dashboard',
  template: `
<md-tab-group>

<md-tab label="Schedule">
<table>
  <tr>
    <th></th>
    <th *ngFor="let day of days">
      <span class="wday">{{day.format("ddd")}}</span>
      <span>{{day.format("MMM DD")}}</span>
    </th>
  </tr>
  <tr *ngFor="let interval of intervals;let i = index">
    <td>{{interval}}</td>
    <td *ngFor="let lesson of lessons[i]">
      <md-checkbox (change)="toggle(lesson, $event)" [checked]="!lesson.canceled" [disabled]="lesson.disabled"></md-checkbox>
    </td>
  </tr>
</table>
</md-tab>
<md-tab label="Account Settings">
</md-tab>
</md-tab-group>`

})

export class DashboardComponent implements OnInit {
  lessons: any[] = [];

  constructor(private lessonService: LessonService) {}

  days = [0, 1, 2, 3, 4, 5, 6].map(function(x) { return moment().add(x, 'days') });

  intervals = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00',
    '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00',
    '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30',
    '22:00', '22:30', '23:00', '23:30'
  ];

  toggle(data: any, event: any): void {
    this.lessonService.update(data.start_time, event.checked)
      .then(lesson => { console.log(lesson); });
  }

  getLessons(): void {
    const now = moment();
    this.lessonService.getLessons()
      .then(lessons => {
        for (let interval of this.intervals) {
          let array = [];
          for (let day of this.days) {
            let dt = day.format(`YYYY-MM-DDT${interval}:00Z`);
            let lesson = lessons.find(function(x: any) { return moment.parseZone(x.start_time).local().format() === dt });
            array.push({
              start_time: dt,
              canceled: (lesson === undefined || lesson.canceled) ? true : false,
              disabled: now.utc().diff(dt, 'hours') > -2
            });
          }
          this.lessons.push(array);
        }
      });
  }

  ngOnInit(): void {
    this.getLessons();
  }
}
