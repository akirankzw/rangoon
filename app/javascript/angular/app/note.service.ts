import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Note } from './note';
import { Lesson } from './lesson';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class NoteService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private notesUrl = './notes.json';

  constructor(private http: Http) {}

  getNote(id: number): Promise<Note> {
    return this.http
      .get(`/notes/${id}.json`, { headers: this.headers })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  updateNote(id: number, content: string): Promise<any> {
    return this.http
      .patch(`/notes/${id}.json`, JSON.stringify({ note: { id: id, content: content } }), { headers: this.headers })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
