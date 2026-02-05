import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartHorizontalListComponent } from './cart-horizontal-list.component';

describe('CartHorizontalListComponent', () => {
  let component: CartHorizontalListComponent;
  let fixture: ComponentFixture<CartHorizontalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartHorizontalListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartHorizontalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
