import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { MdCheckboxModule }  from '@angular/material';

import { APP_CONFIG, AppConfig } from '../app.config';

import { Lesson }        from '../lesson';
import { LessonService } from '../lesson.service';

import * as moment from 'moment';

import templateString from './teacher-dashboard.component.html';

@Component({
  selector: 'dashboard',
  template: templateString
})

@Injectable()
export class TeacherDashboardComponent implements OnInit {
  lessons: any[] = [];
  intervals: string[];
  days: any[];

  constructor(
    private lessonService: LessonService,
    @Inject(APP_CONFIG) config: AppConfig
  ) {
    this.intervals = config.intervals;
    this.days = config.days;
  }

  toggle(data: any, event: any): void {
    this.lessonService.update(data.start_at, event.checked)
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
            let lesson = lessons.find(function(x: any) { return moment.parseZone(x.start_at).local().format() === dt });
            array.push({
              start_at: dt,
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
