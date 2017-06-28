import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Teacher } from '../teacher';
import { TeacherService } from '../teacher.service';

import { APP_CONFIG, AppConfig } from '../app.config';

import 'rxjs/add/operator/toPromise';

import templateString from './teacher-edit.component.html';

@Component({
  template: templateString
})

export class TeacherEditComponent implements OnInit {
  private headers = new Headers({ 'Content-Type': 'application/json' });

  teacher: Teacher;
  startDate = new Date(2000, 0, 1);
  message: string;
  params = {};
  genders = [];
  timezone = [];

  constructor(
    private teacherService: TeacherService,
    @Inject(APP_CONFIG) config: AppConfig
  ) {
    this.teacher = teacherService.fetchTeacher();
    this.genders = config.genders;
    this.timezone = config.timezone;
  }

  ngOnInit(): void {
    console.log(this.teacher);
  }
}
