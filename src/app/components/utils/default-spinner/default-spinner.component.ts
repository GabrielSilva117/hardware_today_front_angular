import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

// spinner.component.ts (standalone approach)
@Component({
  selector: 'app-default-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './default-spinner.component.html',
})
export class DefaultSpinnerComponent {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() color: string = '#4f46e5';
  @Input() trackColor: string = '#e5e7eb';
  @Input() thickness: number = 4;
}
