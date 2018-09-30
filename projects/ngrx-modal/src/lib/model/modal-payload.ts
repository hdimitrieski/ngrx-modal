import { ModalComponent } from './modal';
import { Type } from '@angular/core';

export interface ModalPayload {
  id?: string;
  props?: any;
  component: Type<ModalComponent>;
}
