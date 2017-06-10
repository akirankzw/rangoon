import { Component, OnInit }     from '@angular/core';
import { ActivatedRoute }        from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';

import { BookService }   from '../book.service';

import { Book }   from '../book';

import templateString from './user-dashboard.component.html';

@Component({
  template: templateString
})

export class UserDashboardComponent implements OnInit {
  books: Book[] = [];

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute
  ) {}

  getBooks(): void {
    this.bookService.getBooks()
      .then(books => { this.books = books; })
  }

  ngOnInit(): void {
    this.getBooks();
  }
}
