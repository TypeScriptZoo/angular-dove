import { User } from './user.model';
import { Author } from './author.model';
import { Book } from './book.model';

export interface State {
  user: User;
  authors: Author[];
  books: Book[];
}
