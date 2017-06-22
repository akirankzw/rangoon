import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Lesson } from './lesson';

import 'rxjs/add/operator/toPromise';

@Injectable()

export class LessonService {
  headers = new Headers({ 'Content-Type': 'application/json' });
  lessonsUrl = '/lessons.json';

  constructor(private http: Http) {}

  update(startAt: string, state: string): Promise<Lesson> {
    return this.http
      .post(this.lessonsUrl, JSON.stringify({lesson: {start_at: startAt, aasm_state: state}}), { headers: this.headers })
      .toPromise()
      .then(response => {
        // TODO
        if (response.json().status === 'not_acceptable') {
          window.alert('unable to cancel a lesson');
        }
        response.json() as Lesson;
      }).catch(this.handleError);

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

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
