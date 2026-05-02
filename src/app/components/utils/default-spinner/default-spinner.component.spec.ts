import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultSpinnerComponent } from './default-spinner.component';

describe('DefaultSpinnerComponent', () => {
  let component: DefaultSpinnerComponent;
  let fixture: ComponentFixture<DefaultSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultSpinnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
