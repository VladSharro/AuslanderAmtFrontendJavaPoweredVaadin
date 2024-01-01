import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffenceDataComponent } from './offence-data.component';

describe('OffenceDataComponent', () => {
  let component: OffenceDataComponent;
  let fixture: ComponentFixture<OffenceDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffenceDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OffenceDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
