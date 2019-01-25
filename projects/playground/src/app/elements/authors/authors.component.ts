import { Component, Inject, OnInit } from '@angular/core';
import { AuthorsSelector } from '../../core/selectors';
import { Author } from '../../core/models/author.model';
import { Store } from '../../store/store';
import { State } from '../../core/models/state.model';
import { AuthorsActions } from '../../core/actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-authors',
  template: '<app-list [data]="authors | async"></app-list>'
})
export class AuthorsComponent implements OnInit {

  public authors: Observable<Author[]> = this.store.select(AuthorsSelector.list);

  constructor(
    @Inject('STORE') private store: Store<State>,
  ) {}

  ngOnInit() {
    this.store.dispatch(AuthorsActions.read);
  }

}
