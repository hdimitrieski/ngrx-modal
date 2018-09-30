import { InjectionToken } from '@angular/core';
import { Selector } from '@ngrx/store';
import { State } from './modal.reducer';
import { libPrefix } from './constants';

export type StateKeyOrSelector = string | Selector<any, State>;

export interface StoreModalConfig {
  stateKey?: StateKeyOrSelector;
}

export const ModalConfig = new InjectionToken<StoreModalConfig>(`${libPrefix}/modal-store-config`);
export const InternalConfig = new InjectionToken<StoreModalConfig>(`${libPrefix}/modal-internal-store-config`);
