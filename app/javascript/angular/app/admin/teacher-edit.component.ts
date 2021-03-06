import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Teacher } from '../teacher';
import { TeacherService } from '../teacher.service';

import { APP_CONFIG, AppConfig } from '../app.config';

import 'rxjs/add/operator/toPromise';

import templateString from './teacher-edit.component.html';

@Component({
  template: templateString
})

export class TeacherEditComponent {
  private headers = new Headers({ 'Content-Type': 'application/json' });

  teacher: Teacher = new Teacher();
  startDate = new Date(2000, 0, 1);
  message: string;
  genders = [];
  timezone = [];

  constructor(
    private teacherService: TeacherService,
    @Inject(APP_CONFIG) config: AppConfig
  ) {
    this.genders = config.genders;
    this.timezone = config.timezone;
    (this.teacherService.getTeacher(0)
     .then(response => this.teacher = response));
  }

  uploadAvatar(): void {
    document.forms[2].submit();
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

  onSubmit(f: NgForm): void {
    let params = {
      authenticity_token: f.value.authenticity_token,
      teacher: {
        family_name: f.value.family_name,
        given_name: f.value.given_name,
        skype_name: f.value.skype_name,
        birthdate: f.value.birthdate,
        timezone: f.value.timezone,
        gender: f.value.gender,
        comment: f.value.comment
      }
    };
    this.teacherService.update(params)
      .then(response => {
        console.log(response);
        this.message = '更新しました';
      });
  }
}
