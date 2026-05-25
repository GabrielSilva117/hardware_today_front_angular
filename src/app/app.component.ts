import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavBarComponent} from './components/main/nav-bar/nav-bar.component';
import {FooterComponent} from './components/main/footer/footer.component';
import { DefaultNotificationComponent } from './components/utils/Notification/default-notification/default-notification.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent, FooterComponent, DefaultNotificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hardware_today_front_angular';
}
