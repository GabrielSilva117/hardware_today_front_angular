import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { PurchaseOrderDetailPageComponent } from './purchase-order-detail-page.component';
import { PurchaseOrderService } from '../../../services/purchase-order.service';
describe('PurchaseOrderDetailPageComponent', () => {
  let component: PurchaseOrderDetailPageComponent;
  let fixture: ComponentFixture<PurchaseOrderDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseOrderDetailPageComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '00000000-0000-4000-8000-000000000001' } }
          }
        },
        {
          provide: PurchaseOrderService,
          useValue: {
            getOrder: () =>
              Promise.resolve({
                data: {
                  id: '00000000-0000-4000-8000-000000000001',
                  placedAt: new Date().toISOString(),
                  totalAmount: 10,
                  items: []
                }
              })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PurchaseOrderDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
