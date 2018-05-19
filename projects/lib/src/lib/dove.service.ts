import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export interface Action<T> {
  name: string;
  payload?: T;
};

@Injectable()
export class Dove {

  constructor() {}

  private action: Subject<Action<any>> = new Subject();

  public listen(name: string): Observable<any> {
    return this.action
    .pipe(
      filter(value => value.name == name),
      map(value => value.payload)
    )
  }

  public dispatch<T>(name: string, payload?: T): void {
    this.action.next({
      name: name,
      payload: payload
    });
  }

  public close(): void {
    this.action.complete();
  }

}
