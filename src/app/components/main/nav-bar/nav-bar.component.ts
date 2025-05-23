import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {NavbarItem} from '../../../models/utils/navbar_item';
import {AuthService} from '../../../services/authentication/AuthService';

@Component({
  selector: 'app-nav-bar',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgForOf,
    NgIf
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  isAuthenticated = false;
  navBarItems: NavbarItem[] = [];
  constructor(private authService: AuthService) {
  }

  ngOnInit() {

    this.authService.authStatus$.subscribe(authStatus => {
      this.isAuthenticated = authStatus;
    })

    this.authService.checkAuthStatus();

    this.navBarItems = [
      {
        title: 'Gallery',
        route: '/gallery',
      },
      {
        title: 'My profile',
        route: '/profile',
      },
      {
        title: 'Cart',
        route: '/cart/',
      },
    ]
  }

  logout(): void {
    this.authService.logout();
  }
}
