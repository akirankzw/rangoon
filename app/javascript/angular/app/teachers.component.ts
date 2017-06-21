import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { APP_CONFIG, AppConfig } from './app.config';

import { Lesson }        from './lesson';
import { LessonService } from './lesson.service';
import { BookDialogComponent } from './book-dialog.component';

import * as moment from 'moment';

import templateString from './teachers.component.html';

@Component({
  template: templateString
})

@Injectable()
export class TeachersComponent implements OnInit {
  lessons: any[] = [];
  intervals: string[];
  days: any[];
  wdays: any;

  constructor(
    private lessonService: LessonService,
    public dialog: MdDialog,
    @Inject(APP_CONFIG) config: AppConfig
  ) {
    this.intervals = config.intervals;
    this.days = config.days;
    this.wdays = config.wdays;
  }

  openDialog(lesson: Lesson) {
    let dialogRef = this.dialog.open(BookDialogComponent, { height: '460px', width: '600px' });
    dialogRef.componentInstance.lesson = lesson;
    dialogRef.afterClosed()
      .subscribe(result => { console.log(result); });
  }

  getLessons(): void {
    const now = moment();
    this.lessonService.getLessons()
      .then(lessons => {
        for (let interval of this.intervals) {
          let array: Lesson[] = [];
          for (let day of this.days) {
            let dt = day.format(`YYYY-MM-DDT${interval}:00Z`);
            let lesson: Lesson = lessons.find(function(x: Lesson) { return moment.parseZone(x.start_at).local().format() === dt });
            console.log(lesson);
            array.push({
              id:         lesson === undefined ? 0 : lesson.id,
              canceled:   lesson === undefined ? true : lesson.canceled,
              user_id:    lesson === undefined ? null : lesson.user_id,
              teacher_id: lesson === undefined ? null : lesson.teacher_id,
              text:       lesson !== undefined && lesson.user_id ? 'BOOK' : 'OPEN',
              disabled:   now.utc().diff(dt, 'hours') > -2,
              start_at: dt,
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
