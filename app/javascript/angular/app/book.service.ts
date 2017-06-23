import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Book } from './book';
import { Lesson } from './lesson';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class BookService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private booksUrl = '/books.json';

  constructor(private http: Http) {}

  getBooks(): Promise<Book[]> {
    return this.http.get(this.booksUrl)
      .toPromise()
      .then(response => response.json().data as Book[])
      .catch(this.handleError);
  }

  book(id: number, comment: string): Promise<Lesson> {
    return this.http
      .post(this.booksUrl, JSON.stringify({book: { lesson_id: id, comment: comment }}), { headers: this.headers })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
