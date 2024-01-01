import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialSupportDataComponent } from './financial-support-data.component';

describe('FinancialSupportDataComponent', () => {
  let component: FinancialSupportDataComponent;
  let fixture: ComponentFixture<FinancialSupportDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialSupportDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinancialSupportDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
