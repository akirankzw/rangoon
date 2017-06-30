import { Component, OnInit } from '@angular/core';

import templateString from './user.component.html';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  template: templateString
})

export class UserComponent {
  user: User = new User();
  constructor(
    private userService: UserService
  ) { }

  gotoSubscription(): void {
    location.href ="/subscriptions/new";
  }

  ngOnInit(): void {
    this.userService.getUser()
      .then(user => this.user = user);
  }
}
