import { Injectable } from '@angular/core';
import { Reducer } from '../../store/reducer';
import { User } from '../models/user.model';


@Injectable()
export class UserReducer implements Reducer<User> {

  public segment = 'user';

  public reduce(segment: User, action): User {
    switch (action.name) {
      case 'changeName':
        return {
          ... segment,
          name: action.payload
        };
      break;
    }
  }
}