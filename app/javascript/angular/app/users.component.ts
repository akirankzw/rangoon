import { Component, OnInit }     from '@angular/core';
import { ActivatedRoute }        from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';

import { BookService }   from './book.service';

import { Book }   from './book';
import { User }   from './user';

import * as moment from 'moment';

import templateString from './users.component.html';

@Component({
  selector: 'users',
  template: templateString
})

export class UsersComponent implements OnInit {
  books: Book[] = [];

  user: User = new User(0, '', '', '', '', '', '', ''); // TODO

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
  ) {}

  getBooks(): void {
    this.bookService.getBooks()
      .then(books => { this.books = books; })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.user.id = +params['id'];
      console.log(this.user);
    });

    this.getBooks();
  }
}
