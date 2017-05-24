import { Component, OnInit } from '@angular/core';

import { BookService } from './book.service';
import { Book } from './book';

@Component({
  selector: 'users',
  template: `
    <md-toolbar color="primary">
    <md-toolbar-row>
    <span class="spacer"></span>
    <md-icon class="icon">favorite</md-icon>
    <md-icon class="icon">exit_to_app</md-icon>
    <md-icon class="icon">dashboard</md-icon>
    <md-icon class="icon">home</md-icon>
    <md-icon class="icon">build</md-icon>
    <md-icon class="icon">note_add</md-icon>
    <a routerLink="/teachers/1"><md-icon class="icon">assignment</md-icon></a>
    </md-toolbar-row>
    </md-toolbar>
    <table>
    <tr>
      <td>id</td>
      <td>datetime</td>
      <td>lesson id</td>
      <td>user id</td>
      <td>teacher id</td>
      <td>teacher name</td>
      <td>comment</td>
      <td>comment</td>
      <td>canceled</td>
    <tr>
    <tr *ngFor="let book of books">
      <td>{{book.book_id}}</td>
      <td>{{book.datetime}}</td>
      <td>{{book.lesson_id}}</td>
      <td>{{book.user_id}}</td>
      <td>{{book.teacher_id}}</td>
      <td>{{book.teacher_name}}</td>
      <td>{{book.comment}}</td>
      <td>{{book.canceled}}</td>
    </tr>
    </table>
    <router-outlet></router-outlet>`
})

export class UsersComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService) {}
  getBooks(): void {
    this.bookService.getBooks()
      .then(books => { this.books = books; })
  }

  ngOnInit(): void {
    this.getBooks();
  }
}
