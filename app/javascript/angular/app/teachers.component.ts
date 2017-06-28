import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef }     from '@angular/material';

import { APP_CONFIG, AppConfig } from './app.config';

import { Lesson }        from './lesson';
import { LessonService } from './lesson.service';
import { BookDialogComponent } from './book-dialog.component';

import * as moment from 'moment';

import templateString from './teachers.component.html';

@Component({
  template: templateString
})

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
            array.push(lesson === undefined ? new Lesson() : lesson);
          }
          this.lessons.push(array);
        }
      });
  }

  isDisabled(lesson: Lesson): boolean {
    return lesson.aasm_state === 'opened' ? false : true
  }

  ngOnInit(): void {
    this.getLessons();
  }
}
