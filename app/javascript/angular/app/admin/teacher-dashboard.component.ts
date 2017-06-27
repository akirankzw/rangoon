import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { MdCheckboxModule }  from '@angular/material';
import { MdDialog, MdDialogRef } from '@angular/material';

import { APP_CONFIG, AppConfig } from '../app.config';

import { Lesson }        from '../lesson';
import { User }          from '../user';
import { Note }          from '../note';
import { LessonService } from '../lesson.service';
import { UserService }   from '../user.service';

import { NoteDialogComponent } from '../note-dialog.component';

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
  selected: Lesson;
  morningClass: boolean = false;
  afternoonClass: boolean = false;

  constructor(
    private lessonService: LessonService,
    private userService: UserService,
    public dialog: MdDialog,
    @Inject(APP_CONFIG) config: AppConfig
  ) {
    this.intervals = config.intervals;
    this.days = config.days;
  }

  openDialog(note: Note) {
    let dialogRef = this.dialog.open(NoteDialogComponent, { height: '460px', width: '600px' });
    dialogRef.componentInstance.note = note;
  }

  showMorning(): void {
    this.morningClass = !this.morningClass;
  }

  showAfternoon(): void {
    this.afternoonClass = !this.afternoonClass;
  }

  toggle(lesson: Lesson): void {
    this.selected = lesson;
    this.lessonService.update(lesson.start_at)
      .then(response => {
        console.log(response);
        this.selected.aasm_state = response.aasm_state;
        if (response.id == null) {
          window.alert('unable to open lesson');
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
    if (lesson.aasm_state === 'booked') {
      return true;
    } else if (moment.parseZone(lesson.start_at).local() < moment().add(3, 'hours')) {
      return true;
    }
    return false;
  }

  getDailySchedule(): void {
    const now = moment();
    let array: Lesson[] = [];
    this.lessonService.getDailySchedule()
      .then(lessons => {
        for (let interval of this.intervals) {
          let dt = now.format(`YYYY-MM-DDT${interval}:00Z`);
          let lesson: Lesson = lessons.find(function(x: Lesson) { return moment.parseZone(x.start_at).local().format() === dt });
          if (lesson === undefined) {
            lesson = new Lesson();
          }
          lesson.start_at = interval;
          array.push(lesson);
          // array.push(lesson === undefined ? new Lesson() : lesson);
        }
        let morning = array.splice(0,14)
        this.books = [morning, array];
        console.log(this.books);
      });
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
