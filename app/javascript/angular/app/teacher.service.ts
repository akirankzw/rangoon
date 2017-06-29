import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Teacher } from './teacher';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class TeacherService {
  teacher: Teacher;
  headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  getTeacher (id: number): Promise<Teacher> {
    let url = id === 0 ? '/admin/teachers/profile.json' : `/teachers/${id}.json`; // TODO
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
