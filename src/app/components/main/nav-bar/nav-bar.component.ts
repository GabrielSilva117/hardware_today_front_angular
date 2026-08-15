import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterLinkActive} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {NavbarItem} from '../../../models/utils/navbar_item';
import {AuthService} from '../../../services/authentication/AuthService';
import {debounceTime, distinctUntilChanged, filter, Subject, takeUntil} from 'rxjs';
import {ProductModel} from '../../../models/product/ProductModel';
import {ProductService} from '../../../services/product.service';
import FilterModel from '../../../models/product/FilterModel';

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
export class NavBarComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  navBarItems: NavbarItem[] = [];
  showSearch = false;
  searchTerm$ = new Subject<string>();
  private destroy$ = new Subject<void>();
  constructor(private authService: AuthService, private router: Router, private productService: ProductService) {
  }

  ngOnInit() {
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      ).subscribe((event: NavigationEnd) => {
        this.showSearch = event.urlAfterRedirects === '/gallery';
      });

      // debounce the search input
      this.searchTerm$.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      ).subscribe(term => {
        // console.log(term);
        // const dto: FilterModel = {
        //   maxPrice: 9999,
        //   minPrice: 0,
        //   brand: '',
        //   category: '',
        //   term: term,
        // }
        //
        // this.productService.search(dto).then(res => console.log(res));

        this.productService.updateTerm(term);
      });
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
        title: 'My orders',
        route: '/orders',
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


  onSearchInput(event: Event): void {
    const term = (event.target as HTMLInputElement).value;

    this.searchTerm$.next(term);
  };

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
