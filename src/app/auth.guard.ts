import {CanActivate, CanActivateFn, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from './services/authentication/AuthService';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  async canActivate(): Promise<boolean> {
    const isAuthenticated = await this.authService.checkAuthStatus()
    if (!isAuthenticated) {
      await this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
