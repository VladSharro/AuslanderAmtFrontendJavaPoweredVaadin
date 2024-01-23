import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaillingComponent } from './mailling.component';

describe('MaillingComponent', () => {
  let component: MaillingComponent;
  let fixture: ComponentFixture<MaillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaillingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
