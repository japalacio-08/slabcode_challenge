import { guid, StoreConfig, Store, EntityState, EntityStore } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Event_ } from 'src/app/services/interfaces';

export interface EventState extends EntityState<Event_, number> {

}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'Event_' })
export class EventStore extends EntityStore<EventState> {
  constructor() {
    super();
    this.set({1: null}, {activeId: 1});
  }
}
