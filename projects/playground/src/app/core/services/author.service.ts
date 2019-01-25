import { Injectable } from '@angular/core';
import { Author } from '../models/author.model';
import { Observable, of } from 'rxjs';
import { find } from 'lodash';

@Injectable()
export class AuthorService {

  public authors: Author[] = [
    {
      id: 1,
      name: 'James Joyce',
      booksIds: [1],
    },
  ];

  read(id: number): Observable<Author> {
    const result = find(this.authors, author => author.id === id);
    return of(result);
  }

  readAll(): Observable<Author[]> {
    return of(this.authors);
  }

}
