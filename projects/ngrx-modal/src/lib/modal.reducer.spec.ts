import { reducer, State } from './modal.reducer';
import { ModalComponent } from './model/modal';
import { ModalPayload } from './model/modal-payload';
import { CloseModal, OpenModal } from './modal.actions';
import { Action } from '@ngrx/store';

class TestComponent implements ModalComponent {
  id: string;
  props: any;
}

describe('ModalReducer', () => {

  const createModal = (id: string, props?): ModalPayload => ({
    component: TestComponent,
    id,
    props
  });

  const createState = (...modals: ModalPayload[]): State => ({
    modals: modals
  });

  it('should return initial state', () => {
    // given
    const expected: State = createState();
    const action: Action = {type: 'randomAction'};

    // when
    const result: State = reducer(undefined, action);

    // then
    expect(result).toEqual(expected);
  });

  describe('OpenModalAction', () => {
    it('should add new modal in the store', () => {
      // given
      const newModal: ModalPayload = createModal('2');
      const openModalAction: OpenModal = new OpenModal(newModal);
      const currentState: State = createState(createModal('1'));
      const expectedState: State = createState(createModal('1'), createModal('2'));

      // when
      const result = reducer(currentState, openModalAction);

      // then
      expect(result).toEqual(expectedState);
    });
  });

  describe('CloseModalAction', () => {
    it('should remove modal from the store when modalId is provided', () => {
      // given
      const removedModalId = '1';
      const closeModalAction: CloseModal = new CloseModal(removedModalId);
      const remainingModal = createModal('2');
      const currentState: State = createState(createModal('1'), remainingModal);
      const expectedState: State = createState(remainingModal);

      // when
      const result = reducer(currentState, closeModalAction);

      // then
      expect(result).toEqual(expectedState);
    });

    it('should remove modal from the store when modalId is not provided', () => {
      // given
      const closeModalAction: CloseModal = new CloseModal();
      const currentState: State = createState(createModal('1'));
      const expectedState: State = createState();

      // when
      const result = reducer(currentState, closeModalAction);

      // then
      expect(result).toEqual(expectedState);
    });

    it('should return initial state if modals state is empty', () => {
      // given
      const closeModalAction: CloseModal = new CloseModal();
      const currentState: State = createState();

      // when
      const result = reducer(currentState, closeModalAction);

      // then
      expect(result).toEqual(currentState);
    });
  });


});
