import { Injectable }              from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Lesson } from './lesson';

import 'rxjs/add/operator/toPromise';

@Injectable()

export class LessonService {
  headers = new Headers({ 'Content-Type': 'application/json' });
  lessonsUrl = '/lessons.json';

  constructor(private http: Http) {}

  update(startAt: string): Promise<Lesson> {
    return this.http
      .post(this.lessonsUrl, JSON.stringify({lesson: {start_at: startAt}}), { headers: this.headers })
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getLessons(): Promise<Lesson[]> {
    return this.http.get(this.lessonsUrl)
      .toPromise()
      .then(response => response.json() as Lesson[])
      .catch(this.handleError);
  }

  getDailySchedule(): Promise<Lesson[]> {
    return this.http.get('/lessons/today.json')
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
