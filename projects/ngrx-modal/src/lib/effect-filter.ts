import { Action } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { OperatorFunction } from 'rxjs';
import { CloseModal, NgrxModalActionTypes, OpenModal } from './modal.actions';

export const ofOpenModalType: OperatorFunction<Action, OpenModal> = filter((action: Action): action is OpenModal =>
  action.type === NgrxModalActionTypes.OpenModal
);

export const ofCloseModalType: OperatorFunction<Action, CloseModal> = filter((action: Action): action is CloseModal =>
  action.type === NgrxModalActionTypes.CloseModal
);
