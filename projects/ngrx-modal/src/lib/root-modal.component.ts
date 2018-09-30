import {
  Component,
  ComponentFactoryResolver,
  ViewContainerRef,
  ViewChild,
  AfterViewInit,
  HostBinding,
  HostListener,
  ElementRef,
  Inject,
  OnDestroy
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { ModalHostDirective } from './modal-host.directive';
import { ModalConfig, StoreModalConfig } from './modal-config';
import { ModalPayload } from './model/modal-payload';
import { ActiveModal } from './model/active-modal';
import { getActiveModals, getInactiveModals } from './util';
import { getModals } from './modal.reducer';
import { CloseModal } from './modal.actions';


@Component({
  selector: 'ngrx-root-modal',
  template: `
      <ng-template ngrx-modal-host></ng-template>
  `,
  styleUrls: ['./root-modal.component.css']
})
export class RootModalComponent implements AfterViewInit, OnDestroy {
  @ViewChild(ModalHostDirective) modalHost: ModalHostDirective;

  private activeModals: ActiveModal[] = [];
  private subscription: Subscription;

  @HostBinding('class.modal')
  @HostBinding('class.fade')
  @HostBinding('class.show')
  @HostBinding('class.d-block')
  @HostBinding('class.modal-backdrop')
  get hasModals() {
    return this.activeModals.length > 0;
  }

  get viewContainerRef(): ViewContainerRef {
    return this.modalHost && this.modalHost.viewContainerRef;
  }

  constructor(
    @Inject(ModalConfig) private config: StoreModalConfig,
    private componentFactoryResolver: ComponentFactoryResolver,
    private _elRef: ElementRef<HTMLElement>,
    private store: Store<any>) {
  }

  @HostListener('document:keyup.escape')
  onEscape() {
    this.dispatchCloseModalAction();
  }

  @HostListener('document:click', ['$event'])
  backdropClick($event): void {
    if (this._elRef.nativeElement === $event.target) {
      this.dispatchCloseModalAction();
    }
  }

  ngAfterViewInit() {
    this.subscription = this.store.pipe(
      select(this.config.stateKey),
      distinctUntilChanged(),
      map(getModals)
    ).subscribe((modals: ModalPayload[]) => {
      this.closeInactiveModals(modals);
      this.openActiveModals(modals);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private closeInactiveModals(modals: ModalPayload[]) {
    const closedModals = getInactiveModals(this.activeModals, modals);

    closedModals.forEach(closedModal => closedModal.ref.destroy());

    this.activeModals = getActiveModals(this.activeModals, modals);
  }

  private openActiveModals(modals: ModalPayload[]) {
    const newModals = getInactiveModals(modals, this.activeModals);

    newModals.forEach(modal => this.open(modal));
  }

  private open(modal: ModalPayload) {
    const { component, props, id } = modal;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

    const componentRef = this.viewContainerRef.createComponent(componentFactory);
    componentRef.instance.props = props;
    componentRef.instance.id = id;

    this.activeModals.push({id, ref: componentRef});
  }

  private dispatchCloseModalAction() {
    if (this.hasModals) {
      this.store.dispatch(new CloseModal());
    }
  }
}
