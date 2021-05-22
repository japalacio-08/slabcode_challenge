import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { routes } from 'src/app/config/routes';
import { LocationState, LocationStore } from './location.store';
import { Observable } from 'rxjs-compat';
import { BaseQuery } from '../base/base.query';

@Injectable({
  providedIn: 'root'
})
export class LocationQuery extends BaseQuery<LocationState> {
  constructor(protected store: LocationStore) {
    super(store);
  }

  active$ = () => this.selectLocation().pipe(shareReplay(1));

  getSnapshot = () => this.getValue();

  isLoading$ = () => this.selectLoading();

  Location$ = () => this.selectLocation().pipe(shareReplay(1));

  selectLocation() {
    return this.selectAll().pipe(
      map(it => it.filter(x => x != null))
    )
  }

}
