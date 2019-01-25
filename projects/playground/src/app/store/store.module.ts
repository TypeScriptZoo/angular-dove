
import { NgModule, InjectionToken, ClassProvider } from '@angular/core';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { forEach } from 'lodash';

import { Epic } from './epic';
import { Reducer } from './reducer';
import { Slices } from './slice';

export interface StoreConfig {
  reducers: Function[];
  epics: Function[];
  store: any;
}

export const Reducers = new InjectionToken<Reducer<any>[]>('Reducers');
export const Epics = new InjectionToken<Epic[]>('Epics');

@NgModule({
  declarations: [],
  imports: [],
  providers: []
})
export class AngularDove<T> {

  static forRoot(config: StoreConfig): ModuleWithProviders {

    const provideReducers: ClassProvider[] = [];
    forEach(config.reducers, (reducer: any) => provideReducers.push({provide: Reducers, useClass: reducer, multi: true}));

    const provideEpics: ClassProvider[] = [];
    forEach(config.epics, (epic: any) => provideEpics.push({provide: Epics, useClass: epic, multi: true}));

    return {
      ngModule: AngularDove,
      providers: [
        ... provideReducers,
        ... provideEpics,
        {provide: 'STORE', useFactory: config.store, deps: [Reducers, Epics, Slices]},
        Slices,
      ]
    };

  }
}
