import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Teacher } from './teacher';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class TeacherService {
  teacher: Teacher;
  headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) {
  }

  fetchTeacher(): Teacher {
    console.log(this.teacher);
    if (this.teacher === undefined) {
      this.getTeacher()
        .then(response => this.teacher = response);
    }
    console.log(this.teacher);
    return this.teacher;
  }

  getTeacher(): Promise<Teacher> {
    return this.http.get('/teachers/1.json')
      .toPromise()
      .then(response => response.json() as Teacher)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
