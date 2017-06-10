import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User }   from '../user';

import templateString from './user-edit.component.html';

@Component({
  template: templateString
})

export class UserEditComponent implements OnInit {
  user: User = new User(0, '', '', '', '', '', '', ''); // TODO

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.user.id = +params['id'];
      console.log(this.user);
    });
  }
}
