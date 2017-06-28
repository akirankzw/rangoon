import { Component, OnInit, Inject } from '@angular/core';

import { User } from '../user';
import { UserService } from '../user.service';

import templateString from './users.component.html';

@Component({
  template: templateString
})

export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UserService
  ) { }

  getUsers(): void {
    this.userService.getUsers()
      .then(users => { this.users = users; });
  }

  ngOnInit(): void {
    this.getUsers();
  }
}
