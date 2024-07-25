import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDestinaitonsComponent } from './add-destinaitons.component';

describe('AddDestinaitonsComponent', () => {
  let component: AddDestinaitonsComponent;
  let fixture: ComponentFixture<AddDestinaitonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddDestinaitonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDestinaitonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
