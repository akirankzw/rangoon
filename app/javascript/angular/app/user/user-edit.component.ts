import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { User }        from '../user';
import { UserService } from '../user.service';

import templateString from './user-edit.component.html';

import 'rxjs/add/operator/switchMap';

@Component({
  template: templateString
})

export class UserEditComponent implements OnInit {
  user: User = new User(0, '', '', '', '', '', '', ''); // TODO

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.userService.getUser())
      .subscribe((user: User) => this.user = user);
  }
}
