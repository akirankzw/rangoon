import { Component, OnInit }     from '@angular/core';
import { ActivatedRoute }        from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';

import { BookService }   from '../book.service';

import { Book }   from '../book';

import { EditBookDialogComponent } from '../edit-book-dialog.component';

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

  openDialog(book: Book) {
    let dialogRef = this.dialog.open(EditBookDialogComponent, { height: '400px', width: '600px' });
    dialogRef.componentInstance.book = book;
  }

  ngOnInit(): void {
    this.getBooks();
  }
}
