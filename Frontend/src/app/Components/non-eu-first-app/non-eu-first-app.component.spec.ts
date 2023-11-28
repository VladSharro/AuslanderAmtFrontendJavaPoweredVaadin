import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonEuFirstAppComponent } from './non-eu-first-app.component';

describe('NonEuFirstAppComponent', () => {
  let component: NonEuFirstAppComponent;
  let fixture: ComponentFixture<NonEuFirstAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NonEuFirstAppComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NonEuFirstAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
