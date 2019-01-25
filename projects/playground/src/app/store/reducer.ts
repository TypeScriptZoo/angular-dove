import { Action } from './action';

export interface Reducer<T> {
  segment: string;
  reduce: (slice: T, action: Action) => T;
}
