import {Component, Input} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
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
  styleUrl: './product-combobox.component.css'
})
export class ProductComboboxComponent {
  formControl = new FormControl('');
  @Input() itemsToList!: Array<any>
  @Input() label!: String;
}
