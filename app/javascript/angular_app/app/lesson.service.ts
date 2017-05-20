import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Lesson } from './lesson';

import 'rxjs/add/operator/toPromise';

@Injectable()

export class LessonService {
  private headers = new Headers({ 'Content-Type': 'application/json' });

  // TODO:
  private lessonsUrl = 'teachers/1/lessons.json';

  constructor(private http: Http) {}

  update(datetime: string, checked: boolean): Promise<any> {
    const url = `${this.lessonsUrl}`;
    return this.http
      .post(url, JSON.stringify({lesson: {teacher_id: 1, start_time: datetime, canceled: !checked}}), { headers: this.headers })
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  // getLessons(): Promise<Lesson[]> {
  getLessons(): Promise<any> {
    return this.http.get(this.lessonsUrl)
      .toPromise()
      .then(response => response.json().data as Lesson[])
      .catch(this.handleError);
  }
}
