import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgrxModalModule } from 'ngrx-modal';

import { AppComponent } from './app.component';
import { ConfirmationModalComponent } from './confirmation-modal.component';
import { metaReducers, reducers } from './app.reducer';
import { AppEffects } from './app.effects';
import { Api } from './api';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment.prod';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationModalComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([
      AppEffects
    ]),
    NgrxModalModule.forRoot({
      stateKey: 'modal'
    })
  ],
  entryComponents: [
    ConfirmationModalComponent
  ],
  providers: [
    Api
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
