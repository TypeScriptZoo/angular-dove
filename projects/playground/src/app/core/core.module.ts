import { NgModule } from '@angular/core';
import { AngularDove } from './../store/store.module';
import { UserReducer } from './reducers/user.reducer';
import { createStore } from '../store/store';
import { AuthorService } from './services/author.service';
import { AuthorsReducer } from './reducers/authors.reducer';
import { InitialState } from './state/initial.state';
import { State } from './models/state.model';
import { AuthorsEpic } from './epics/authors.epic';

@NgModule({
  providers: [
    AuthorService,
  ],
  imports: [
    AngularDove.forRoot({
      store: createStore<State>(InitialState),
      reducers: [AuthorsReducer, UserReducer],
      epics: [AuthorsEpic],
    })
  ]
})
export class CoreModule {}
