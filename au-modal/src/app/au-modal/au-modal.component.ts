import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { ModalService } from './modal.service';

@Component({
  selector: 'au-modal',
  templateUrl: './au-modal.component.html',
  styleUrls: ['./au-modal.component.scss'],
})
export class AuModalComponent implements OnInit, OnDestroy {

  @Input() body: TemplateRef<any>;
  @Input() hideOnEsc: boolean = true;
  @Input() hideOnClickOutside: boolean = true;
  @Input() context: any;

  unsunscriber: any;

  constructor(
    private modalService: ModalService,
    private eventManager: EventManager) { }

  ngOnDestroy(): void {
    if (this.unsunscriber) {
      this.unsunscriber();
    }
  }

  ngOnInit() {
    if (this.hideOnEsc) {
      this.unsunscriber = this.eventManager.addGlobalEventListener('window', 'keyup.esc', () => {
        this.close();
      });
    }
  }

  close() {
    this.modalService.close();
  }

  onClickOutsideModal() {
    if (this.hideOnClickOutside) {
      this.close();
    }
  }
}
