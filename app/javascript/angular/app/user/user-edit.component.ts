import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MdChipsModule }          from '@angular/material';
import { Headers, Http }          from '@angular/http';
import { NgForm }                 from '@angular/forms';

import { User }        from '../user';
import { UserService } from '../user.service';

import templateString from './user-edit.component.html';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

@Component({
  template: templateString
})

export class UserEditComponent implements OnInit {
  private headers = new Headers({ 'Content-Type': 'application/json' });

  user: User = new User();

  startDate = new Date(2000, 0, 1);
  maxDate = new Date();

  message: string;
  params = {};

  genders = [
    { value: 'male', viewValue: '男性' },
    { value: 'female', viewValue: '女性' }
  ]

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private http: Http
  ) { }

  onSubmit(f: NgForm) {
    this.params['user'] = {
      family_name: f.value.family_name,
      given_name: f.value.given_name,
      birthdate: f.value.birthdate,
      gender: f.value.gender
    };
    return this.http
      .post('/users/profile', JSON.stringify(this.params), { headers: this.headers })
      .toPromise()
      .then(response => {
        if (response.json().status === 'ok') {
          this.message = 'ユーザー情報を更新しました';
        }
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.userService.getUser())
      .subscribe((user: User) => this.user = user);
  }
}
