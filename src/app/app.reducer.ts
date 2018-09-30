import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { reducer as modalReducer, State as ModalState } from 'ngrx-modal';
import * as fromItems from './items.reducer';

export interface State {
  modal: ModalState;
  items: fromItems.State;
}

export const reducers: ActionReducerMap<State> = {
  modal: modalReducer,
  items: fromItems.reducer
};

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [logger];

export const getModalState = createFeatureSelector<State, ModalState>(
  'modal'
);

export const getModals = createSelector(
  getModalState,
  state => state.modals
);

export const getItemsState = createFeatureSelector<State, fromItems.State>(
  'items'
);

export const getAllItems = createSelector(
  getItemsState,
  fromItems.getAllItems
);
