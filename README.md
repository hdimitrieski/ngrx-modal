# ngrx-modal
[![Travis](https://travis-ci.com/hdimitrieski/ngrx-modal.svg)](https://travis-ci.com/hdimitrieski/ngrx-modal)

Handle presenting modal dialogs via NgRx store.

## Installation

```
npm install ngrx-modal --save

yarn add ngrx-modal
```
##Setup

```ts
import { NgrxModalModule } from 'ngrx-modal';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    NgrxModalModule.forRoot({
      stateKey: 'modal'
    })
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

- `stateKey`: The name of reducer key, defaults to `modals`
