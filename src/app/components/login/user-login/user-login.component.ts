import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {DefaultFieldComponent} from '../../utils/default-field/default-field.component';
import {PasswordFieldComponent} from '../../utils/password-field/password-field.component';
import {MatButton} from '@angular/material/button';
import {AuthService} from '../../../services/authentication/AuthService';
import UserModel from '../../../models/user/UserModel'
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-login',
  imports: [
    FormsModule,
    DefaultFieldComponent,
    PasswordFieldComponent,
    MatButton,
    ReactiveFormsModule
  ],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
  loginForm: FormGroup;
  isSubmitting: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  onSubmit(): void {
    if (this.loginForm.valid) {
      let loginObj: UserModel = this.loginForm.value;

      this.authService.login(loginObj.email, loginObj.password).then(r => {console.log(r);this.router.navigate(['/gallery']);});
    }
  }
}
