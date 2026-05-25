import { Injectable, signal } from '@angular/core';
import { Notification, NotificationConfig } from '../models/utils/Notifications';

@Injectable({ providedIn: 'root' })
export class NotificationService {

  private _notifications = signal<Notification[]>([]);
  readonly notifications = this._notifications.asReadonly();

  show(config: NotificationConfig): string {
    const id = crypto.randomUUID();
    const notification: Notification = {
      type: 'info',
      duration: 4000,
      dismissible: true,
      ...config,
      id,
    };

    this._notifications.update(list => [...list, notification]);

    if (notification.duration && notification.duration > 0) {
      setTimeout(() => this.dismiss(id), notification.duration);
    }

    return id; // caller can dismiss programmatically if needed
  }

  // Convenience methods
  success(message: string, config?: Partial<NotificationConfig>) {
    return this.show({ ...config, message, type: 'success' });
  }

  error(message: string, config?: Partial<NotificationConfig>) {
    return this.show({ ...config, message, type: 'error', duration: 0 }); // errors are sticky by default
  }

  warning(message: string, config?: Partial<NotificationConfig>) {
    return this.show({ ...config, message, type: 'warning' });
  }

  info(message: string, config?: Partial<NotificationConfig>) {
    return this.show({ ...config, message, type: 'info' });
  }

  dismiss(id: string) {
    this._notifications.update(list => list.filter(n => n.id !== id));
  }

  dismissAll() {
    this._notifications.set([]);
  }
}