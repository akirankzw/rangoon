import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Headers, Http } from '@angular/http';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Lesson } from './lesson';
import { APP_CONFIG, AppConfig } from './app.config';

import * as Clipboard from 'clipboard';
import templateString from './book-dialog.component.html';
@Component({
  template: templateString,
  styles: [
    `
    textarea {
      width: 550px;
      height: 220px;
    }
    `
  ]
})

@Injectable()
export class BookDialogComponent implements OnInit {
  headers = new Headers({ 'Content-Type': 'application/json' });
  bookUrl = '/books.json';
  lesson: Lesson;
  message: string;
  emoji: string[];
  div: any;

  constructor(
    public dialogRef: MdDialogRef<BookDialogComponent>,
    private http: Http,
    @Inject(APP_CONFIG) config: AppConfig
  ) {
    this.emoji = config.emoji;
  }

  onSubmit(lesson: Lesson, f: NgForm): Promise<any> {
    return this.http
      .post(this.bookUrl, JSON.stringify({book: { lesson_id: lesson.id, comment: f.value.comment }}), { headers: this.headers })
      .toPromise()
      .then(response => {
        this.message = response.json().message;
        // REFACTOR
        if (response.json().status === 'ok') {
          lesson.text = 'BOOK';
          lesson.user_id = response.json().user_id;
        }
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  ngOnInit(): void {
    this.div = document.getElementById('clipboard');
    for(let e of this.emoji) {
      let elem = document.createElement('span');
      new Clipboard(elem, {
        target: function(trigger) {
          return trigger;
        }
      });
      elem.innerHTML = e;
      this.div.appendChild(elem);
    }
  }
}
