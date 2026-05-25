export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface NotificationConfig {
  message: string;
  type?: NotificationType;          // default: 'info'
  title?: string;                   // optional bold title
  duration?: number;                // ms before auto-dismiss (0 = sticky)
  dismissible?: boolean;            // show close button (default: true)
  action?: {
    label: string;
    callback: () => void;
  };
}

export interface Notification extends NotificationConfig {
  id: string;
}