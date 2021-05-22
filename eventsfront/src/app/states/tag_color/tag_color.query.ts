import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { routes } from 'src/app/config/routes';
import { TagColorState, TagColorStore } from './tag_color.store';
import { Observable } from 'rxjs-compat';
import { BaseQuery } from '../base/base.query';

@Injectable({
  providedIn: 'root'
})
export class TagColorQuery extends BaseQuery<TagColorState> {
  constructor(protected store: TagColorStore) {
    super(store);
  }

  active$ = () => this.selectTagColor().pipe(shareReplay(1));

  getSnapshot = () => this.getValue();

  isLoading$ = () => this.selectLoading();

  TagColor$ = () => this.selectTagColor().pipe(shareReplay(1));

  selectTagColor() {
    return this.selectAll().pipe(
      map(it => it.filter(x => x != null))
    )
  }

}
