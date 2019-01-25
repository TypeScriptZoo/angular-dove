import { Injectable } from '@angular/core';
import { AuthorService } from '../services/author.service';
import { Action } from '../../store/action';
import { AuthorsActions } from './../actions';

@Injectable()
export class AuthorsEpic {

  constructor (
    private authorService: AuthorService,
  ) {}

  public effects(action: Action): Action {
    switch (action.name) {
      case(AuthorsActions.read):
        return {
          ... action,
          payload: this.authorService.readAll(),
        };
      break;
    }
  }
}
