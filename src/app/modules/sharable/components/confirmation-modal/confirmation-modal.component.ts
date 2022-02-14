import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal'

@Component({
  selector: 'confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent {

  @ViewChild(ModalDirective) public confirmationModal:ModalDirective;

  @Input() open:boolean = false;
  @Input() index:number = 0;
  @Output() removedIndex = new EventEmitter<any>();

  showChildModal(): void {
    this.confirmationModal.show();
  }

  hideChildModal(): void {
    this.confirmationModal.hide();
  }

  removeIndex(): any {
    this.hideChildModal();
    this.removedIndex.emit(this.index);
  }

}
