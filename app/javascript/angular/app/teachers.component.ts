import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef }     from '@angular/material';
import { ActivatedRoute, Params }    from '@angular/router';

import { APP_CONFIG, AppConfig } from './app.config';

import { Lesson }  from './lesson';
import { Teacher } from './teacher';

import { LessonService } from './lesson.service';
import { TeacherService } from './teacher.service';

import { BookDialogComponent } from './book-dialog.component';

import * as moment from 'moment';

import templateString from './teachers.component.html';

@Component({
  template: templateString
})

export class TeachersComponent implements OnInit {
  lessons: any[] = [];
  teacher: Teacher = new Teacher(); // TODO
  intervals: string[];
  days: any[];
  wdays: any;
  genders = [];
  timezone = [];

  constructor(
    private lessonService: LessonService,
    private teacherService: TeacherService,
    private route: ActivatedRoute,
    public dialog: MdDialog,
    @Inject(APP_CONFIG) config: AppConfig
  ) {
    this.intervals = config.intervals;
    this.days = config.days;
    this.wdays = config.wdays;
    this.genders = config.genders;
    this.timezone = config.timezone;
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
    this.route.params
      .switchMap((params: Params) => this.teacherService.getTeacher(+params['id']))
      .subscribe(teacher => this.teacher = teacher);
    this.getLessons();
  }
}
