import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingDataDialogueComponent } from './missing-data-dialogue.component';

describe('MissingDataDialogueComponent', () => {
  let component: MissingDataDialogueComponent;
  let fixture: ComponentFixture<MissingDataDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissingDataDialogueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MissingDataDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
