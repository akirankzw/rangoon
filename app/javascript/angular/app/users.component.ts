import { Component, OnInit }from '@angular/core';
import { ActivatedRoute }   from '@angular/router';

import { BookService } from './book.service';
import { UserService } from './user.service';

import { Book } from './book';
import { User } from './user';

@Component({
  selector: 'users',
  template: `
<md-toolbar color="accent">
  <md-toolbar-row>
    <span class="spacer"></span>
    <md-icon class="icon">favorite</md-icon>
    <a href="/users/sign_out"><md-icon class="icon">exit_to_app</md-icon></a>
    <a routerLink="/dashboard"><md-icon class="icon">dashboard</md-icon></a>
    <a [routerLink]="['/users', user.id]"><md-icon class="icon">home</md-icon></a>
    <md-icon class="icon">build</md-icon>
    <md-icon class="icon">note_add</md-icon>
    <a routerLink="/teachers/1"><md-icon class="icon">assignment</md-icon></a>
  </md-toolbar-row>
</md-toolbar>

<md-tab-group>
<md-tab label="予約一覧">
<table>
  <tr>
    <td>id</td>
    <td>datetime</td>
    <td>lesson id</td>
    <td>user id</td>
    <td>teacher id</td>
    <td>teacher name</td>
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
</md-tab>

  <md-tab label="アカウント">
    <form [action]="['/users', user.id]" method="post">
    <input [(ngModel)]="user.end_date" name="user[registration][end_date]" placeholder="end_date">
    <input [(ngModel)]="user.given_name" name="user[given_name]" placeholder="given_name">
    <input [(ngModel)]="user.family_name" name="user[family_name]" placeholder="family_name">
    <input [(ngModel)]="user.birthdate" name="user[birthdate]" placeholder="birthdate">
    <input [(ngModel)]="user.sex" name="user[sex]" placeholder="sex">
    <input [(ngModel)]="user.email" name="user[email]" placeholder="email">
    <img src="{{user.avatar}}">
    </form>
  </md-tab>

</md-tab-group>
<router-outlet></router-outlet>
`
})

export class UsersComponent implements OnInit {
  books: Book[] = [];
  user: User = new User(0, '', '', '', '', '', '', ''); // TODO

  constructor(
    private bookService: BookService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  getBooks(): void {
    this.bookService.getBooks()
      .then(books => { this.books = books; })
  }

  getUser(): void {
    this.userService.getUser(this.user.id)
      .then(user => { this.user = user; })
  }

  onSubmit() {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.user.id = +params['id'];
      console.log(this.user);
    });

    this.getBooks();
    this.getUser();
  }
}
