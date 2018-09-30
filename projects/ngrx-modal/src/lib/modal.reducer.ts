import { generateModalId } from './util';
import { ModalPayload } from './model/modal-payload';
import { CloseModal, NgrxModalActions, NgrxModalActionTypes, OpenModal } from './modal.actions';

export interface State {
  modals: ModalPayload[];
}

const initialState: State = {
  modals: []
};

const openModal = (state: State, {payload: modal}: OpenModal): State => ({
  modals: [
    ...state.modals,
    {
      ...modal,
      id: modal.id || generateModalId()
    }
  ]
});

const closeModal = (state: State, action: CloseModal): State => ({
  modals: action.payload
    ? state.modals.filter(m => m.id !== action.payload)
    : state.modals.slice(0, state.modals.length - 1)
});

export function reducer(
  state: State = initialState,
  action: NgrxModalActions
): State {
  switch (action.type) {
    case NgrxModalActionTypes.OpenModal:
      return openModal(state, action as OpenModal);

    case NgrxModalActionTypes.CloseModal:
      return closeModal(state, action as CloseModal);

    default:
      return state;
  }
}

export const getModals = (state: State) => state.modals;
