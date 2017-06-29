import { Component } from '@angular/core';

import templateString from './user.component.html';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  template: templateString
})

export class UserComponent {
  user: User;
  constructor(
    private userService: UserService
  ) {
    this.user = userService.fetchUser();
  }
  gotoSubscription(): void {
    location.href ="/subscriptions/new";
  }
}
