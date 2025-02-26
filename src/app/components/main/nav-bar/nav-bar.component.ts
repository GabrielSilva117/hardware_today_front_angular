import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgForOf} from '@angular/common';
import {NavbarItem} from '../../../models/utils/navbar_item';

@Component({
  selector: 'app-nav-bar',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgForOf
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  navBarItems: NavbarItem[] = []

  ngOnInit() {
    this.navBarItems = [
      {
        title: 'Gallery',
        route: '/gallery',
      },
      {
        title: 'My profile',
        route: '/profile',
      },
    ]
  }
}
