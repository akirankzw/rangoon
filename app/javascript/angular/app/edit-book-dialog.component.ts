import { Component } from '@angular/core';
import { NgForm    } from '@angular/forms';
import { Headers, Http } from '@angular/http';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Book } from './book';

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

export class EditBookDialogComponent {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  book: Book;
  message = '';

  constructor(
    public dialogRef: MdDialogRef<EditBookDialogComponent>,
    private http: Http
  ) {}

  onSubmit(f: NgForm): Promise<any> {
    console.log(f.value);
    return this.http
      .patch(`/books/${f.value.id}.json`, JSON.stringify({book: { canceled: true }}), { headers: this.headers })
      .toPromise()
      .then(response => {
        if (response.json().canceled === true) {
          // this.book = book;
          this.message = 'レッスンをキャンセルしました';
        } else {
          this.message = 'レッスンをキャンセルできませんでした';
          console.error(response);
        }
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
