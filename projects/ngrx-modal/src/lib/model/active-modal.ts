import { ComponentRef } from '@angular/core';
import { ModalComponent } from './modal';

export interface ActiveModal {
  id: string;
  ref: ComponentRef<ModalComponent>;
}
