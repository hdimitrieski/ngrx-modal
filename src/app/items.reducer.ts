import { Item } from './model/item';
import { FetchItemsSuccess, ItemsActions, ItemsActionTypes, RemoveItemSuccess } from './app.actions';

export interface State {
  items: Item[];
}

const initialState: State = {
  items: []
};

const fetchItemsSuccess = (state: State, action: FetchItemsSuccess): State => ({
  items: action.payload
});

const removeItemSuccess = (state: State, {payload: removedId}: RemoveItemSuccess): State => ({
  items: state.items.filter(item => item.id !== removedId)
});

export function reducer(
  state: State = initialState,
  action: ItemsActions
): State {
  switch (action.type) {
    case ItemsActionTypes.FetchItemsSuccess:
      return fetchItemsSuccess(state, action as FetchItemsSuccess);

    case ItemsActionTypes.RemoveItemSuccess:
      return removeItemSuccess(state, action as RemoveItemSuccess);

    default:
      return state;
  }
}

export const getAllItems = (state: State) => state.items;
