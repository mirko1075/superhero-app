import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent {
  constructor(public activeModal: NgbActiveModal) {}

  public onClickDismiss(): void {
    this.activeModal.dismiss();
  }

  public deleteConfirm(): void {
    this.activeModal.close(true);
  }

  public cancelChanges(): void {
    this.activeModal.dismiss();
  }
}
