import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StayDataComponent } from './stay-data.component';

describe('StayDataComponent', () => {
  let component: StayDataComponent;
  let fixture: ComponentFixture<StayDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StayDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StayDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
