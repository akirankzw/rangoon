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

  emoji = [
    '&#x1f601', '&#x1f602', '&#x1f603', '&#x1f604', '&#x1f605', '&#x1f606', '&#x1f609',
    '&#x1f60A', '&#x1f60B', '&#x1f60C', '&#x1f60F', '&#x1f612', '&#x1f613', '&#x1f614',
    '&#x1f616', '&#x1f618', '&#x1f61A', '&#x1f61C', '&#x1f61D', '&#x1f61E', '&#x1f620',
    '&#x1f621', '&#x1f622', '&#x1f623', '&#x1f624', '&#x1f625', '&#x1f628', '&#x1f629',
    '&#x1f62A', '&#x1f62B', '&#x1f62D', '&#x1f630', '&#x1f631', '&#x1f632', '&#x1f633',
    '&#x1f635', '&#x1f637', '&#x1f638', '&#x1f639', '&#x1f63A', '&#x1f63B', '&#x1f63C',
    '&#x1f63D', '&#x1f63E', '&#x1f63F', '&#x1f640', '&#x1f645', '&#x1f646', '&#x1f647',
    '&#x1f648', '&#x1f649', '&#x1f64A', '&#x1f64B', '&#x1f64C', '&#x1f64D', '&#x1f64E',
    '&#x1f64F'
  ];

  div: any;

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
    this.div = document.getElementById('emoji');
    for(let e of this.emoji) {
      let elem = document.createElement('span');
      elem.innerHTML = e;
      this.div.appendChild(elem);
    }
  }
}
