import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Item } from './model/item';

@Injectable()
export class Api {

  private items = [
    {
      id: 1,
      name: 'First Item'
    },
    {
      id: 2,
      name: 'Item 2'
    },
    {
      id: 3,
      name: 'Test Item'
    }
  ];

  fetchItems(): Observable<Item[]> {
    return of(this.items);
  }

  removeItem(id: number): Observable<number> {
    this.items = this.items.filter(item => item.id !== id);
    return of(id);
  }

}
