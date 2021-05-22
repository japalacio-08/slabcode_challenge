import { guid, StoreConfig, Store, EntityState, EntityStore } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { TagColor } from 'src/app/services/interfaces';

export interface TagColorState extends EntityState<TagColor, number> {

}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'TagColor' })
export class TagColorStore extends EntityStore<TagColorState> {
  constructor() {
    super();
    this.set({1: null}, {activeId: 1});
  }
}
