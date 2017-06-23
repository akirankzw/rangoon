import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { MdCheckboxModule }  from '@angular/material';

import { APP_CONFIG, AppConfig } from '../app.config';

import { Lesson }        from '../lesson';
import { User }          from '../user';
import { LessonService } from '../lesson.service';
import { UserService }   from '../user.service';

import * as moment from 'moment';

import templateString from './teacher-dashboard.component.html';

@Component({
  selector: 'dashboard',
  template: templateString
})

@Injectable()
export class TeacherDashboardComponent implements OnInit {
  lessons: any[] = []; // TODO
  books: any[] = []; // today's schedule
  users: User[] = [];
  intervals: string[];
  days: any[];

  constructor(
    private lessonService: LessonService,
    private userService: UserService,
    @Inject(APP_CONFIG) config: AppConfig
  ) {
    this.intervals = config.intervals;
    this.days = config.days;
  }

  toggle(lesson: Lesson): void {
    this.lessonService.update(lesson.start_at)
      .then(response => {
        if (response.id == null) {
          window.alert('unable to open lesson');
          lesson.aasm_state = 'closed';
        }
      });
  }

  getLessons(): void {
    const now = moment();
    this.lessonService.getLessons()
      .then(lessons => {
        for (let interval of this.intervals) {
          let array: Lesson[] = [];
          for (let day of this.days) {
            let dt = day.format(`YYYY-MM-DDT${interval}:00Z`);
            let lesson = lessons.find(function(x: Lesson) { return moment.parseZone(x.start_at).local().format() === dt });
            if (lesson === undefined) {
              lesson = new Lesson();
              lesson.start_at = dt;
            }
            array.push(lesson);
          }
          this.lessons.push(array);
        }
      });
  }

  isDisabled(lesson: Lesson) {
    return false;
  }

  getDailySchedule(): void {
    this.lessonService.getDailySchedule()
      .then(books => { this.books = books; });
  }

  getUsers(): void {
    this.userService.getUsers()
      .then(users => { this.users = users; });
  }

  ngOnInit(): void {
    this.getLessons();
    this.getDailySchedule();
    this.getUsers();
  }
}
