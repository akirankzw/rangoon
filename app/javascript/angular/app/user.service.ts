import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { User } from './user';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) {}

  getUser(): Promise<User> {
    return this.http.get('/users/profile.json')
      .toPromise()
      .then(response => response.json().data as User)
      .catch(this.handleError);
  }

  getUsers(): Promise<User[]> {
    return this.http.get('/admin/users.json')
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
