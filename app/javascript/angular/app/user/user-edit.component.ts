import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { User }        from '../user';
import { UserService } from '../user.service';

import templateString from './user-edit.component.html';

import 'rxjs/add/operator/switchMap';

@Component({
  template: templateString,
  styles: [
    `
      .mat-card {
        margin: 10px;
      }

    `
  ]
})

export class UserEditComponent implements OnInit {
  user: User = new User(0, '', '', '', '', '', '', '', ''); // TODO

  gender = [
    { value: 'male', viewValue: '男性' },
    { value: 'female', viewValue: '女性' }
  ]

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  onSubmit() {
    document.forms[0].submit();
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.userService.getUser())
      .subscribe((user: User) => this.user = user);
  }
}
