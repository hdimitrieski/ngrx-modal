import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { Api } from './api';
import { of } from 'rxjs';
import {
  FetchItemsFail,
  FetchItemsSuccess,
  ItemsActionTypes,
  RemoveItem,
  ConfirmItemDeletion,
  RemoveItemFail,
  RemoveItemSuccess
} from './app.actions';
import { OpenModal } from 'ngrx-modal';
import { ConfirmationModalComponent } from './confirmation-modal.component';
import { CloseModal } from '../../projects/ngrx-modal/src/lib/modal.actions';
import { ofCloseModalType, ofOpenModalType } from '../../projects/ngrx-modal/src/lib/effect-filter';

@Injectable()
export class AppEffects {

  @Effect()
  fetchItems$ = this.actions$.pipe(
    ofType(ItemsActionTypes.FetchItems),
    exhaustMap(() =>
      this.api.fetchItems().pipe(
        switchMap(items => of(new FetchItemsSuccess(items))),
        catchError(error => of(new FetchItemsFail(error)))
      )
    )
  );

  @Effect()
  confirmItemDeletion$ = this.actions$.pipe(
    ofType<ConfirmItemDeletion>(ItemsActionTypes.ConfirmItemDeletion),
    map(({payload: id}) => new OpenModal({
      component: ConfirmationModalComponent,
      props: {id}
    }))
  );

  @Effect()
  removeItem$ = this.actions$.pipe(
    ofType<RemoveItem>(ItemsActionTypes.RemoveItem),
    exhaustMap(({payload: id}) =>
      this.api.removeItem(id).pipe(
        switchMap(removedItemId => [
          new RemoveItemSuccess(removedItemId),
          new CloseModal()
        ]),
        catchError(error => of(new RemoveItemFail(error)))
      )
    )
  );

  @Effect({dispatch: false})
  openModal$ = this.actions$.pipe(
    ofOpenModalType,
    tap(openModalAction => console.log('Effects - ', openModalAction))
  );

  @Effect({dispatch: false})
  closeModal$ = this.actions$.pipe(
    ofCloseModalType,
    tap(closeModalAction => console.log('Effects - ', closeModalAction))
  );

  constructor(private actions$: Actions, private api: Api) {
  }

}
