import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params }    from '@angular/router';
import { MdChipsModule }             from '@angular/material';
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
  genders = [];
  timezone = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    @Inject(APP_CONFIG) config: AppConfig
  ) {
    this.user = userService.fetchUser();
    this.genders = config.genders;
    this.timezone = config.timezone;
  }

  uploadAvatar(): void {
    document.forms[1].submit();
  }

  onChange(event): void {
    let files = event.target.files || event.dataTransfer.files;
    if (files.length) {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        (<HTMLImageElement>document.querySelector("#preview")).src = e.target.result;
      };
      reader.readAsDataURL(files[0]);
    }
  }

  onSubmit(f: NgForm): void { // TODO
    let params = {
      authenticity_token: f.value.token,
      user: {
        family_name: f.value.family_name,
        given_name: f.value.given_name,
        skype_name: f.value.skype_name,
        birthdate: f.value.birthdate,
        timezone: f.value.timezone,
        gender: f.value.gender
      }
    };

    this.userService.update(params)
      .then(response => {
        console.log(response);
      });
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
