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
import {NgFor, NgIf} from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-default-dialog',
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatButton,
    NgIf,
    NgFor,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './default-dialog.component.html',
  styleUrl: './default-dialog.component.css'
})
export class DefaultDialogComponent {

  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DefaultDialogData,
              private dialogRef: MatDialogRef<DefaultDialogComponent>,
              private fb: FormBuilder
            ) {
              this.form = this.buildForm()
  }

  private buildForm(): FormGroup {
    const controls: Record<string, any> = {};

    for (const field of this.data.formFields ?? []) {
      const validators = field.validators ?? [];
      if (field.required) validators.push(Validators.required);
      controls[field.key] = [null, validators];
    }

    return this.fb.group(controls);
  }

  get hasFields(): boolean {
    return (this.data.formFields?.length ?? 0) > 0;
  }

  onCancelClick(): void {
    this.data.onCancel?.(); // safely call if defined
    this.dialogRef.close('cancel');
  }

  onConfirmClick(): void {
    if (this.hasFields && this.form.invalid) {
      this.form.markAllAsTouched(); // triggers validation messages
      return;
    }

    // passes form values only if there are fields, otherwise undefined
    this.data.onConfirm?.(this.hasFields ? this.form.value : undefined);
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
