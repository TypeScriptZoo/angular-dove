import { Action } from './action';

export interface Epic {
  effects: (action: Action) => Action;
}

