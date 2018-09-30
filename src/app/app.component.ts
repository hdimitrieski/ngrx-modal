import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromRoot from './app.reducer';
import { ConfirmItemDeletion, FetchItems } from './app.actions';
import { Observable } from 'rxjs';
import { Item } from './model/item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  items$: Observable<Item[]>;

  constructor(private store: Store<fromRoot.State>) {
    this.items$ = this.store.pipe(select(fromRoot.getAllItems));
  }

  ngOnInit(): void {
    this.store.dispatch(new FetchItems());
  }

  onRemove({id}: Item) {
    this.store.dispatch(new ConfirmItemDeletion(id));
  }

}
