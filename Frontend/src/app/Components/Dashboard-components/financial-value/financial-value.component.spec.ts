import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialValueComponent } from './financial-value.component';

describe('FinancialValueComponent', () => {
  let component: FinancialValueComponent;
  let fixture: ComponentFixture<FinancialValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialValueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinancialValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
