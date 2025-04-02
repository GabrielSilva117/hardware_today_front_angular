import {Component, forwardRef, Input} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-default-field',
  imports: [
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './default-field.component.html',
  styleUrl: './default-field.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DefaultFieldComponent),
      multi: true
    }
  ]
})
export class DefaultFieldComponent implements ControlValueAccessor {
  @Input() fieldLabel!: string;

  value: string = '';
  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  handleInput(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.value = inputValue;
    this.onChange(inputValue);  // Update Angular FormControl
  }
}
