import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Book } from './book';

import 'rxjs/add/operator/toPromise';

@Injectable()

export class BookService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private booksUrl = 'books.json';

  constructor(private http: Http) {}

  getBooks(): Promise<any> {
    return this.http.get(this.booksUrl)
      .toPromise()
      .then(response => response.json().data as Book[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
