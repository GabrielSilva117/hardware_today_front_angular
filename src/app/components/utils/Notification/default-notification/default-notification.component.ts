import { Component, inject } from '@angular/core';
import { NotificationService } from '../../../../services/notification.service';
import { NgFor } from '@angular/common';
import { NotificationToastComponent } from '../notification-toast/notification-toast.component';

@Component({
  selector: 'app-default-notification',
  imports: [NgFor, NotificationToastComponent],
  templateUrl: './default-notification.component.html',
  styleUrl: './default-notification.component.css'
})
export class DefaultNotificationComponent {
  service = inject(NotificationService);

  trackById(_: number, n: { id: string }) {
    return n.id;
  }
}
