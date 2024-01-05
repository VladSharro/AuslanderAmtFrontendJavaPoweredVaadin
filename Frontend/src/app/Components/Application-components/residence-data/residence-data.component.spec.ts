import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidenceDataComponent } from './residence-data.component';

describe('ResidenceDataComponent', () => {
  let component: ResidenceDataComponent;
  let fixture: ComponentFixture<ResidenceDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidenceDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResidenceDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
