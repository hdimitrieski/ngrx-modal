import { Action } from '@ngrx/store';
import { Item } from './model/item';

export enum ItemsActionTypes {
  FetchItems = '[Items] Fetch Items',
  FetchItemsSuccess = '[Items] Fetch Items Success',
  FetchItemsFail = '[Items] Fetch Items Fail',

  RemoveItem = '[Items] Remove Item',
  ConfirmItemDeletion = '[Items] Confirm Item Deletion',
  RemoveItemSuccess = '[Items] Remove Item Success',
  RemoveItemsFail = '[Items] Remove Item Fail'
}

export class FetchItems implements Action {
  readonly type = ItemsActionTypes.FetchItems;
}

export class FetchItemsSuccess implements Action {
  readonly type = ItemsActionTypes.FetchItemsSuccess;
  constructor(public payload: Item[]) {}
}

export class FetchItemsFail implements Action {
  readonly type = ItemsActionTypes.FetchItemsFail;
  constructor(public payload: Error) {}
}

export class RemoveItem implements Action {
  readonly type = ItemsActionTypes.RemoveItem;
  constructor(public payload: number) {}
}

export class ConfirmItemDeletion implements Action {
  readonly type = ItemsActionTypes.ConfirmItemDeletion;
  constructor(public payload: number) {}
}

export class RemoveItemSuccess implements Action {
  readonly type = ItemsActionTypes.RemoveItemSuccess;
  constructor(public payload: number) {}
}

export class RemoveItemFail implements Action {
  readonly type = ItemsActionTypes.RemoveItemsFail;
  constructor(public payload: Error) {}
}

export type ItemsActions =
  | FetchItems
  | FetchItemsSuccess
  | FetchItemsFail
  | RemoveItem
  | ConfirmItemDeletion
  | RemoveItemSuccess
  | RemoveItemSuccess
  | RemoveItemFail;
