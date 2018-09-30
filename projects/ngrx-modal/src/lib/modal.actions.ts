import { Action } from '@ngrx/store';
import { ModalPayload } from './model/modal-payload';
import { libPrefix } from './constants';

export const NgrxModalActionTypes = {
  OpenModal: `${libPrefix}/modal/open-modal`,
  CloseModal: `${libPrefix}/modal/close-modal`
};

export class OpenModal implements Action {
  readonly type = NgrxModalActionTypes.OpenModal;
  constructor(public payload: ModalPayload) {}
}

export class CloseModal implements Action {
  readonly type = NgrxModalActionTypes.CloseModal;
  constructor(public payload?: string) {}
}

export type NgrxModalActions = OpenModal | CloseModal;
