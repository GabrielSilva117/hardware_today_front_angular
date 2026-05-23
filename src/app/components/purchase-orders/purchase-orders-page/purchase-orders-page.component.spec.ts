import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PurchaseOrdersPageComponent } from './purchase-orders-page.component';
import { PurchaseOrderService } from '../../../services/purchase-order.service';

describe('PurchaseOrdersPageComponent', () => {
  let component: PurchaseOrdersPageComponent;
  let fixture: ComponentFixture<PurchaseOrdersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseOrdersPageComponent],
      providers: [
        {
          provide: PurchaseOrderService,
          useValue: {
            getMyOrders: () => Promise.resolve({ data: [] })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PurchaseOrdersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
