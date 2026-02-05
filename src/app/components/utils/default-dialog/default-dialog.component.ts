import {Component, Inject, Input} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {DefaultDialogData} from '../../../models/utils/DefaultDialogData';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-default-dialog',
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatButton,
    NgIf
  ],
  templateUrl: './default-dialog.component.html',
  styleUrl: './default-dialog.component.css'
})
export class DefaultDialogComponent {
  // @Input() title: string = 'Dialog Title';
  // @Input() contentText: string = 'Dialog Message'
  // @Input() cancelText: string = 'Cancel';
  // @Input() confirmText: string = 'Confirm';
  // @Input() isCancelHidden: boolean = false;
  // @Input() isConfirmHidden: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DefaultDialogData,
              private dialogRef: MatDialogRef<DefaultDialogComponent>) {
  }

  onCancelClick(): void {
    this.data.onCancel?.(); // safely call if defined
    this.dialogRef.close('cancel');
  }

  onConfirmClick(): void {
    this.data.onConfirm?.();
    this.dialogRef.close('confirm');
  }

  onThirdClick(): void {
    this.data.onThirdAction?.();
    this.dialogRef.close('third');
  }

  close(result?: boolean): void {
    this.dialogRef.close(result);
  }
}
