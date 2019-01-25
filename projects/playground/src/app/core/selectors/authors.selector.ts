import { Selector } from '../../store/selector';
import { State } from '../models/state.model';
import { Author } from '../models/author.model';

export const list: Selector<State> = {
  name: 'AuthorsList',
  factory: (state: State): Author[] => state.authors,
};






