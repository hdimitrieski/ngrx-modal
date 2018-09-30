import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { CloseModal, ModalComponent } from 'ngrx-modal';
import { RemoveItem } from './app.actions';

@Component({
  template: `
    <div>
      <p>Are you sure?</p>
      <button (click)="onConfirm()">Confirm</button>
      <button (click)="onClose()">Close</button>
    </div>
  `
})
export class ConfirmationModalComponent implements ModalComponent {
  @Input() id: string;
  @Input() props: any;

  constructor(private store: Store<any>) {
  }

  onConfirm() {
    this.store.dispatch(new RemoveItem(this.props.id));
  }

  onClose() {
    this.store.dispatch(new CloseModal(this.id));
  }
}
