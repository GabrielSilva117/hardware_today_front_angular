import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, MatToolbarModule],
  template: `
    <mat-toolbar class="footer">
      <span>&copy; {{ currentYear }} Hardware Today. All rights reserved.</span>
    </mat-toolbar>
  `,
  styles: [`
    .footer {
      background-color: #1e1e1e;
      color: #ffffff;
      justify-content: center;
      margin-top: auto;
      height: 64px;
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
