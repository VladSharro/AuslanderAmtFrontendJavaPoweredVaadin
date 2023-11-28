import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinueApplicationComponent } from './continue-application.component';

describe('ContinueApplicationComponent', () => {
  let component: ContinueApplicationComponent;
  let fixture: ComponentFixture<ContinueApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContinueApplicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContinueApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
