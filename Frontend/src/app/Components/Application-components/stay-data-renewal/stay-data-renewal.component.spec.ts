import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StayDataRenewalComponent } from './stay-data-renewal.component';

describe('StayDataComponent', () => {
  let component: StayDataRenewalComponent;
  let fixture: ComponentFixture<StayDataRenewalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StayDataRenewalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StayDataRenewalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});