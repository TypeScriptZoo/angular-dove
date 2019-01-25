import { State } from '../models/state.model';

export const InitialState: State = {
  user: {
    id: null,
    name: '',
    email: '',
    booksIds: [],
  },
  authors: [],
  books: [],
};
