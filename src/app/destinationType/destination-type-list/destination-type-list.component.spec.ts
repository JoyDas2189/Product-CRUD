import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationTypeListComponent } from './destination-type-list.component';

describe('DestinationTypeListComponent', () => {
  let component: DestinationTypeListComponent;
  let fixture: ComponentFixture<DestinationTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DestinationTypeListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DestinationTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
