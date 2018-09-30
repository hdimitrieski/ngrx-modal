import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ngrxModalHost]',
})
export class ModalHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
