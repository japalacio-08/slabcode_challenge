import { guid, StoreConfig, Store, EntityState, EntityStore } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Location_ } from 'src/app/services/interfaces';

export interface LocationState extends EntityState<Location_, number> {

}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'Location' })
export class LocationStore extends EntityStore<LocationState> {
  constructor() {
    super();
    this.set({1: null}, {activeId: 1});
  }
}
