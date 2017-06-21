import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Lesson } from './lesson';

import 'rxjs/add/operator/toPromise';

@Injectable()

export class LessonService {
  private headers = new Headers({ 'Content-Type': 'application/json' });

  // TODO:
  private lessonsUrl = 'lessons.json';

  constructor(private http: Http) {}

  update(datetime: string, checked: boolean): Promise<Lesson> {
    return this.http
      .post(this.lessonsUrl, JSON.stringify({lesson: {start_at: datetime, canceled: !checked}}), { headers: this.headers })
      .toPromise()
      .then(response => {
        if (response.json().status === 'not_acceptable') {
          window.alert('unable to cancel the lesson');
        }
      })
      .catch(this.handleError);
  }

  getLessons(): Promise<Lesson[]> {
    return this.http.get(this.lessonsUrl)
      .toPromise()
      .then(response => response.json().data as Lesson[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
