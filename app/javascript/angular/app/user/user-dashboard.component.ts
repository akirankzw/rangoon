import { Component, OnInit }     from '@angular/core';
import { ActivatedRoute }        from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';

import { BookService } from '../book.service';

import { Book } from '../book';

import { EditBookDialogComponent } from '../edit-book-dialog.component';

import * as moment from 'moment';

import templateString from './user-dashboard.component.html';

@Component({
  template: templateString
})

export class UserDashboardComponent implements OnInit {
  books: Book[] = [];

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    public dialog: MdDialog
  ) {}

  getBooks(): void {
    this.bookService.getBooks()
      .then(books => { this.books = books; })
  }

  cancelBook(book: any): void {
    if (moment.parseZone(book.start_at).local() < moment().add(3, 'hours')) {
      window.alert('レッスン開始3時間前はキャンセルできません🙇');
    } else if (window.confirm('レッスンをキャンセルしますか？')) {
      this.bookService.cancelBook(book.id)
        .then(response => {
          book.id = null;
          console.log(response);
        });
    }
  }

  openDialog(book: Book): void {
    let dialogRef = this.dialog.open(EditBookDialogComponent, { height: '420px', width: '600px' });
    dialogRef.componentInstance.book = book;
  }

  isCancelable(book: any): boolean {
    if (moment.parseZone(book.start_at).local() < moment().add(2, 'hours')) { // TODO
      return false;
    } else {
      return true;
    }
  }

  isFutureLesson(book: any): boolean {
    if (moment.parseZone(book.start_at).local() >= moment()) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit(): void {
    this.getBooks();
  }
}
