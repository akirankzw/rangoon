import { Component, OnInit }     from '@angular/core';
import { ActivatedRoute }        from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';

import { BookService }   from './book.service';
import { UserService }   from './user.service';
import { LessonService } from './lesson.service';

import { Book }   from './book';
import { User }   from './user';
import { Lesson } from './lesson';

import { BookDialogComponent } from './book-dialog.component';

import * as moment from 'moment';

@Component({
  selector: 'users',
  template: `

<md-tab-group>
<md-tab label="予約一覧">
<table>
  <tr>
    <td>予約番号</td>
    <td>日時</td>
    <td>先生</td>
    <td></td>
    <td>コメント</td>
    <td>キャンセル</td>
  <tr>
  <tr *ngFor="let book of books">
    <td>{{book.lesson_id}}</td>
    <td>{{book.datetime}}</td>
    <td>{{book.teacher_name}}</td>
    <td><img src="{{user.avatar}}" width="40px" height="40px"></td>
    <td>{{book.comment}}</td>
    <td>{{book.canceled}}</td>
  </tr>
</table>


</md-tab>

  <md-tab label="アカウント">
    <img src="{{user.avatar}}">
  <md-input-container>
    <input  mdInput [mdDatepicker]="picker" [(ngModel)]="user.end_date" name="user[registration][end_date]">
    <button mdSuffix [mdDatepickerToggle]="picker"></button>
  </md-input-container>

  <md-input-container>
    <input mdInput [(ngModel)]="user.given_name" name="user[given_name]" placeholder="given_name">
  </md-input-container>

  <md-input-container>
    <input mdInput [(ngModel)]="user.family_name" name="user[family_name]" placeholder="family_name">
  </md-input-container>

  <md-input-container>
    <input mdInput [mdDatepicker]="picker" [(ngModel)]="user.birthdate" name="user[birthdate]">
    <button mdSuffix [mdDatepickerToggle]="picker"></button>
  </md-input-container>

  <md-select placeholder="sex" [(ngModel)]="user.sex" name="user[sex]" disabled>
  </md-select>

  <md-input-container>
    <input mdInput type="email" [(ngModel)]="user.email" name="user[email]" placeholder="email">
  </md-input-container>


  </md-tab>

    <md-tab label="先生のスケジュール">
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
    <button md-raised-button (click)="openDialog(lesson)" *ngIf="!lesson.canceled" color="accent" [disabled]="lesson.user_id">{{lesson.text}}</button>
    </td>
  </tr>
</table>
    </md-tab>

</md-tab-group>
`
})

export class UsersComponent implements OnInit {
  books: Book[] = [];
  lessons: any[] = [];

  user: User = new User(0, '', '', '', '', '', '', ''); // TODO

  constructor(
    private bookService: BookService,
    private userService: UserService,
    private lessonService: LessonService,
    private route: ActivatedRoute,
    public dialog: MdDialog
  ) {}

  days = [0, 1, 2, 3, 4, 5, 6].map(function(x) { return moment().add(x, 'days') });

  intervals = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00',
    '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00',
    '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30',
    '22:00', '22:30', '23:00', '23:30'
  ];

  openDialog(lesson: Lesson) {
    let dialogRef = this.dialog.open(BookDialogComponent, { height: '400px', width: '600px' });
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
            let lesson: Lesson = lessons.find(function(x: Lesson) { return moment.parseZone(x.start_time).local().format() === dt });
            console.log(lesson);
            array.push({
              id:         lesson === undefined ? 0 : lesson.id,
              canceled:   lesson === undefined ? true : lesson.canceled,
              user_id:    lesson === undefined ? null : lesson.user_id,
              teacher_id: lesson === undefined ? null : lesson.teacher_id,
              text:       lesson !== undefined && lesson.user_id ? 'BOOK' : 'OPEN',
              disabled:   now.utc().diff(dt, 'hours') > -2,
              start_time: dt,
            });
          }
          this.lessons.push(array);
        }
      });
  }

  getBooks(): void {
    this.bookService.getBooks()
      .then(books => { this.books = books; })
  }

  getUser(): void {
    this.userService.getUser(this.user.id)
      .then(user => { this.user = user; })
  }

  onSubmit() {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.user.id = +params['id'];
      console.log(this.user);
    });

    this.getBooks();
    this.getUser();
    this.getLessons();
  }
}
