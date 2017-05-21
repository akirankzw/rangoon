import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'book-dialog',
  template: `
    <form (ngSubmit)="onSubmit($event)" action="/lessons" method="post" #bookForm="ngForm">
    <md-input-container class="example-full-width">
    <textarea mdInput placeholder="comment"></textarea>
    </md-input-container>
    <button type="submit" md-raised-button>Submit</button>
    <button type="button" md-raised-button (click)="bookForm.reset()">Reset</button>
    </form>`

})

export class BookDialogComponent {
  constructor(public dialogRef: MdDialogRef<BookDialogComponent>) { }

  onSubmit(event): void {
    console.log(event);
  }
}
