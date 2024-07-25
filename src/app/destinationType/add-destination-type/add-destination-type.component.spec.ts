import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDestinationTypeComponent } from './add-destination-type.component';

describe('AddDestinationTypeComponent', () => {
  let component: AddDestinationTypeComponent;
  let fixture: ComponentFixture<AddDestinationTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddDestinationTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDestinationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
