import { Injectable } from '@angular/core';
import { find, filter } from 'lodash';
import { Observable } from 'rxjs';
import { map, distinctUntilChanged, finalize, share } from 'rxjs/operators';
import { deepEqual } from 'fast-equals';
import { Selector } from './selector';

export interface Slice {
  name: string;
  multicast: Observable<any>;
}

@Injectable()
export class Slices {

  /* Slices */
  public slices: Slice[] = [];

  public createSlice(state: Observable<any>, selector: Selector<any>): Slice {
    const slice: Slice = {
      name: selector.name,
      multicast: state.pipe(
          map(newState => selector.factory(newState)),
          distinctUntilChanged((prev, next) => deepEqual(prev, next)),
          finalize(() => this.deleteSlice(selector.name)),
          share()
        ),
      };
    this.slices.push(slice);
    return slice;
  }

  public readSlice(name: string): Slice {
    return find(this.slices, item => item.name === name);
  }

  private deleteSlice(name: string): void {
    filter(this.slices, slice => slice.name !== name);
  }

}
