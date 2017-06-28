import { Component } from '@angular/core';

import templateString from './teacher.component.html';

import { Teacher } from '../teacher';
import { TeacherService } from '../teacher.service';

@Component({
  template: templateString
})

export class TeacherComponent {
  teacher: Teacher;

  constructor(
    private teacherService: TeacherService
  ) {
    this.teacher = teacherService.fetchTeacher();
  }
}
