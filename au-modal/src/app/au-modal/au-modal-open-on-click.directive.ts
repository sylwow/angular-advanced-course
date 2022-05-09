import { ContentChild, Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuModalComponent } from './au-modal.component';
import { ModalService } from './modal.service';

@Directive({
  selector: '[auModalOpenOnClick]'
})
export class AuModalOpenOnClickDirective implements OnInit, OnDestroy {
  sub: Subscription;
  elements: HTMLBaseElement[];


  constructor(
    private modalService: ModalService,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,

  ) { }


  ngOnInit(): void {
    this.sub = this.modalService.$close.subscribe(() => this.viewContainerRef.clear());
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.elements.forEach(e => e.removeEventListener('click', this.openModal));
  }

  @Input() set auModalOpenOnClick(els: HTMLBaseElement | HTMLBaseElement[]) {
    if (Array.isArray(els)) {
      this.elements = els;
    } else {
      this.elements = [els]
    }
    this.elements.forEach(e => e.addEventListener('click', this.openModal));
  }

  openModal = (() => {
    this.viewContainerRef.clear();
    this.viewContainerRef.createEmbeddedView(this.templateRef);
  }).bind(this);

  closeModal() {
    this.viewContainerRef.clear();
  }
}
