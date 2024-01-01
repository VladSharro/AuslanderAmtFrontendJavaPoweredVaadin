import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoDataComponent } from './photo-data.component';

describe('PhotoDataComponent', () => {
  let component: PhotoDataComponent;
  let fixture: ComponentFixture<PhotoDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhotoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
