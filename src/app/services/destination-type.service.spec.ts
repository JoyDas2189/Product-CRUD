import { TestBed } from '@angular/core/testing';

import { DestinationTypeService } from './destination-type.service';

describe('DestinationTypeService', () => {
  let service: DestinationTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DestinationTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
