import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdiitionalDocumentsComponent } from './adiitional-documents.component';

describe('AdiitionalDocumentsComponent', () => {
  let component: AdiitionalDocumentsComponent;
  let fixture: ComponentFixture<AdiitionalDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdiitionalDocumentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdiitionalDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
