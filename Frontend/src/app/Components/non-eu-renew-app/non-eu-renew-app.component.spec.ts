import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonEuRenewAppComponent } from './non-eu-renew-app.component';

describe('NonEuRenewAppComponent', () => {
  let component: NonEuRenewAppComponent;
  let fixture: ComponentFixture<NonEuRenewAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NonEuRenewAppComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NonEuRenewAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
