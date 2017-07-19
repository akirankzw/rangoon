import { Component, OnInit, Inject } from '@angular/core';
import { NgForm }                    from '@angular/forms';
import { Headers, Http }             from '@angular/http';
import { MdDialog, MdDialogRef }     from '@angular/material';

import { APP_CONFIG, AppConfig } from './app.config';

import { Book } from './book';
import { BookService } from './book.service';

import * as Clipboard from 'clipboard';

import templateString from './edit-book-dialog.component.html';

@Component({
  template: templateString,
  styles: [
    `
    textarea {
      width: 550px;
      height: 160px;
    }
    `
  ]
})

export class EditBookDialogComponent implements OnInit {
  headers = new Headers({ 'Content-Type': 'application/json' });
  book: Book;
  message = '';
  emoji: string[];

  constructor(
    public dialogRef: MdDialogRef<EditBookDialogComponent>,
    private bookService: BookService,
    @Inject(APP_CONFIG) config: AppConfig
  ) {
    this.emoji = config.emoji;
  }

  onSubmit(f: NgForm): void {
    this.bookService.updateBook(f)
      .then(response => {
        this.message = '更新しました';
        console.log(response);
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
        field.value = field.value.substring(0, startPos) + e.text + field.value.substring(endPos);
      } else {
        field.value += e.text;
      }
    });
  }
}
