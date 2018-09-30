import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalHostDirective } from './modal-host.directive';
import { RootModalComponent } from './root-modal.component';
import { InternalConfig, ModalConfig, StoreModalConfig } from './modal-config';

export const DEFAULT_MODALS_FEATURE_NAME = 'modalsStore';

export function createStoreModalDefaultConfig(config: StoreModalConfig): StoreModalConfig {
  return {
    stateKey: DEFAULT_MODALS_FEATURE_NAME,
    ...config
  };
}

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: ModalConfig,
      useFactory: createStoreModalDefaultConfig,
      deps: [InternalConfig]
    }
  ],
  declarations: [
    RootModalComponent,
    ModalHostDirective
  ],
  exports: [
    RootModalComponent
  ]
})
export class NgrxModalModule {
  static forRoot(config: StoreModalConfig = {}): ModuleWithProviders {
    return {
      ngModule: NgrxModalModule,
      providers: [
        {
          provide: InternalConfig,
          useValue: config
        }
      ]
    };
  }
}
