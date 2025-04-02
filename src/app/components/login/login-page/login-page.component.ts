import { Component } from '@angular/core';
import {UserLoginComponent} from '../user-login/user-login.component';

@Component({
  selector: 'app-login-page',
  imports: [
    UserLoginComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

}
