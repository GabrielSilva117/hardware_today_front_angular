import { Component, input, output } from '@angular/core';
import { Notification } from '../../../../models/utils/Notifications';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-notification-toast',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './notification-toast.component.html',
  styleUrl: './notification-toast.component.css'
})
export class NotificationToastComponent {
  notification = input.required<Notification>();
  dismissed = output<string>();

  icon() {
    const icons: Record<string, string> = {
      success: '✓',
      error:   '✕',
      warning: '⚠',
      info:    'ℹ',
    };
    return icons[this.notification().type ?? 'info'];
  }
}
