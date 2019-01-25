import { Injectable } from '@angular/core';
import { Reducer } from '../../store/reducer';
import { Author } from '../models/author.model';
import { Action } from '../../store/action';
import { AuthorsActions } from '../actions';


@Injectable()
export class AuthorsReducer implements Reducer<Author[]> {

  public segment = 'authors';

  public reduce(segment: Author[], action: Action): Author[] {
    switch (action.name) {
      case (AuthorsActions.read):
        return action.payload;
      break;
    }
  }
}