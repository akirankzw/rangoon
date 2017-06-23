import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Headers, Http } from '@angular/http';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Lesson } from './lesson';
import { APP_CONFIG, AppConfig } from './app.config';

import { BookService } from './book.service';

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
  lesson: Lesson;
  message: string;
  emoji: string[];

  constructor(
    public dialogRef: MdDialogRef<BookDialogComponent>,
    private bookService: BookService,
    private http: Http,
    @Inject(APP_CONFIG) config: AppConfig
  ) {
    this.emoji = config.emoji;
  }

  onSubmit(lesson: Lesson, f: NgForm): void {
    this.bookService.book(lesson.id, f.value.comment)
      .then(response => {
        this.lesson.aasm_state = response.aasm_state;
      });
  }

  ngOnInit(): void {
    new Clipboard('.emoji', {
      target: function(trigger) {
        return trigger;
      }
    }).on('success', function(e) {
      let field = (<HTMLInputElement>document.forms[0].elements[1]);
      if (field.selectionStart || field.selectionStart === 0) {
        let startPos = field.selectionStart;
        let endPos   = field.selectionEnd;
        field.value = field.value.substring(0, startPos) + e.text + field.value.substring(endPos, field.value.length);
      } else {
        field.value += e.text;
      }
    });
  }
}
