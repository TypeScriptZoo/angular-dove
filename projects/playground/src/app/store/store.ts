import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, of, isObservable, empty, Observable } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { assign, forEach, isEmpty } from 'lodash';

import { DoveError } from './error';
import { Action } from './action';
import { Epic } from './epic';
import { Selector } from './selector';
import { Slices } from './slice';
import { Reducer } from './reducer';

export function createStore<State>(initialState: State) {
  return (reducers: Reducer<any>[], epics: Epic[], slices: Slices) => new Store<State>(initialState, reducers, epics, slices);
}

@Injectable()
export class Store<State> {

  private action$: Subject<Action> = new Subject();
  private state$: BehaviorSubject<State>;

  public get state() {
    return this.state$.asObservable();
  }

  constructor(
    private initialState: State,
    private reducers: Reducer<Partial<State>>[],
    private epics: Epic[],
    private slices: Slices,
  ) {

    /** Initialise State */
    this.state$ = new BehaviorSubject(initialState);

    /** Handle Action */
    this.action$
      .pipe(
        mergeMap((action: Action) => this.applyEpics(epics, action)),
      )
      .subscribe((action: Action) => {

        /** Check what has changed */
        const changes: Partial<State> = this.applyReducers(reducers, action);

        /** If anything has changed, provide new State */
        if (!isEmpty(changes)) {
          this.state$.next(assign({}, this.state$.value, changes));
        }

      });
  }

  public select(selector: Selector<State>): Observable<any> {
    if (!selector.name) {
      throw new DoveError('SELECTOR_MISSING_NAME');
    }

    const slice = this.slices.readSlice(selector.name);

    if (slice) {
      return slice.multicast;
    } else {
      if (!selector.factory) {
        throw new DoveError('SELECTOR_MISSING_FACTORY');
      }
      return this.slices.createSlice(this.state, selector).multicast;
    }
  }

  public dispatch(name: string, payload?: any): void {
    if (!name) {
      throw new DoveError('ACTION_MISSING_NAME');
    }
    this.action$.next({
      name: name,
      payload: payload
    });
  }

  private applyEpics(epics, action: Action): Observable<any> {
    /* Call each registered epic function */
    forEach(epics, epic => {
      action = epic.effects(action);
    });

    if (isObservable(action.payload)) {

      /* Return action as Observable */
      return action.payload.pipe(

        /* Catch Error from SideEffect and naturalise it, since it should be handled by interceptor */
        catchError(epic => empty()),

        /* Unpack action payload from inner Observable */
        map((inner: Action) => {
          return {
            name: action.name,
            payload: inner,
          };
        }),
      );

      /* If epic haven't changed anything convert original action to an Observable */
    } else {
      return of(action);
    }
  }

  private applyReducers(reducers, action): Partial<State> {

    const changes: Partial<State> = {};

    forEach(reducers, reducer => {
      const segment = this.state$.value[reducer.segment];
      if (segment) {
        const newSegment = reducer.reduce(segment, action);
        if (newSegment) {
          changes[reducer.segment] = newSegment;
        }
      } else {
        throw new DoveError('REDUCER_MISSING_SEGMENT', { segment: reducer.segment, reducer: reducer.__proto__.constructor.name });
      }
    });

    return changes;

  }
}
