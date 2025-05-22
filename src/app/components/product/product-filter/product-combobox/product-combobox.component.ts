import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-product-combobox',
  imports: [
    MatLabel,
    MatFormField,
    MatSelect,
    ReactiveFormsModule,
    MatOption
  ],
  templateUrl: './product-combobox.component.html',
  styleUrl: './product-combobox.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProductComboboxComponent),
      multi: true
    }
  ]
})
export class ProductComboboxComponent implements ControlValueAccessor {
  // formControl = new FormControl('');
  @Input() itemsToList!: Array<any>
  @Input() label!: String;
  @Input() multiple: boolean = false;
  @Input() labelKey: string = 'name'
  @Input() valueKey: string = 'id';

  onChange = (_: any) => {};
  onTouched = () => {};

  value: any;

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  setValue(event: any) {
    this.value = event.value;
    console.log(this.value);
    this.onChange(this.value);
    this.onTouched();
  }

  protected readonly eval = eval;
}
