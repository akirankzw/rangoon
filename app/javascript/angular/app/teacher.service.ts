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

  fetchTeacher(url: string): Teacher {
    console.log(this.teacher);
    if (this.teacher === undefined) {
      this.getTeacher(url)
        .then(response => this.teacher = response);
    }
    console.log(this.teacher);
    return this.teacher;
  }

  getTeacher(url: string): Promise<Teacher> {
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Teacher)
      .catch(this.handleError);
  }

  update(params: any): Promise<Teacher> {
    return this.http
      .post('/admin/teachers/profile.json', JSON.stringify(params), { headers: this.headers })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
