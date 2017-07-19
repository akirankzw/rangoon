import { Component } from '@angular/core';

import { Teacher } from '../teacher';
import { TeacherService } from '../teacher.service';

import templateString from './teacher.component.html';

@Component({
  template: templateString
})

export class TeacherComponent {
  teacher: Teacher;

  constructor(
    teacherService: TeacherService
  ) {
    (teacherService.getTeacher(0)
     .then(response => this.teacher = response));
  }
}
