import { Event_ } from 'src/app/services/interfaces';
import { Injectable } from '@angular/core';
import { filter, map, shareReplay } from 'rxjs/operators';
import { EventState, EventStore } from './event.store';
import { Observable } from 'rxjs-compat';
import { BaseQuery } from '../base/base.query';

@Injectable({
  providedIn: 'root'
})
export class EventQuery extends BaseQuery<EventState> {
  constructor(protected store: EventStore) {
    super(store);
  }

  active$ = () => this.selectActiveEvent().pipe(filter(it => it != null));;

  getSnapshot = () => this.getValue();

  isLoading$ = () => this.selectLoading();

  Event$ = () => this.selectEvent().pipe(shareReplay(1));

  selectEvent() {
    return this.selectAll().pipe(
      map(it => it.filter(x => x != null))
    )
  }

  selectActiveEvent() {
    return this.selectActive(it => it) as Observable<Event_>;
  }

}
