import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params }    from '@angular/router';
import { MdChipsModule }             from '@angular/material';
import { Headers, Http }             from '@angular/http';
import { NgForm }                    from '@angular/forms';

import { APP_CONFIG, AppConfig } from '../app.config';

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

  user: User;

  startDate = new Date(2000, 0, 1);

  message: string;
  params = {};

  genders = [];
  timezone = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private http: Http,
    @Inject(APP_CONFIG) config: AppConfig
  ) {
    this.user = userService.fetchUser();
    this.genders = config.genders;
    this.timezone = config.timezone;
  }

  uploadAvatar(): void {
    document.forms[1].submit();
  }

  onSubmit(f: NgForm) {
    this.params['user'] = {
      family_name: f.value.family_name,
      given_name: f.value.given_name,
      skype_name: f.value.skype_name,
      birthdate: f.value.birthdate,
      timezone: f.value.timezone,
      gender: f.value.gender
    };
    return this.http
      .post('/users/profile.json', JSON.stringify(this.params), { headers: this.headers })
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
    console.log(this.user);
    /*
    this.route.params
      .switchMap((params: Params) => this.userService.getUser())
      .subscribe((user: User) => this.user = user);
    */
  }
}
