import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal-component.html',
  styleUrls: ['./confirmation-modal-component.css'],
  imports:[CommonModule]
})
export class ConfirmationModalComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() confirmButtonText: string = 'تأیید';
  @Input() cancelButtonText: string = 'انصراف';
  @Input() confirmButtonColor: string = 'primary';
  @Input() cancelButtonColor: string = 'secondary';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
