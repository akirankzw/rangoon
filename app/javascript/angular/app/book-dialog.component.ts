import { Component } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Lesson } from './lesson';

@Component({
  selector: 'book-dialog',
  template: `
  {{message}}
    <form method="post" #bookForm="ngForm">
    <input type="hidden" name="book[lesson_id]" value="{{lesson.lesson_id}}">
    <p>
    <md-input-container class="full-width">
    <textarea mdInput placeholder="comment" name="book[comment]"></textarea>
    </md-input-container>
    </p>
    <p>
    <button type="submit" (click)="onSubmit(lesson)" md-raised-button>Submit</button>
    <button type="button" md-raised-button (click)="bookForm.reset()">Cancel</button>
    </p>
    </form>`

})

export class BookDialogComponent {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private bookUrl = '/books.json';
  lesson: Lesson;
  message = '';

  constructor(
    public dialogRef: MdDialogRef<BookDialogComponent>,
    private http: Http
  ) {}

  onSubmit(lesson): Promise<any> {
    // document.forms[0].submit();
    return this.http
      .post(this.bookUrl, JSON.stringify({book: { lesson_id: lesson.lesson_id }}), { headers: this.headers })
      .toPromise()
      .then(response => {
        this.message = response.json().message;
        lesson.color = 'primary';
        lesson.text = 'BOOK';
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
