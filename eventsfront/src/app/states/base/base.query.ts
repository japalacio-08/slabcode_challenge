import { EntityStore, getEntityType, getIDType, QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseQuery<T> extends QueryEntity<T> {
  constructor(protected store: EntityStore<T, getEntityType<T>, getIDType<T>>) {
    super(store);
  }

  setLoading(isLoading) {
    this.store.setLoading(isLoading);
  }

  setState(data, activeId) {
    this.store.set(data, activeId);
  }

  resetStore() {
    this.store.reset();
  }

  setActive(id) {
    this.store.setActive(id);
  }

}
