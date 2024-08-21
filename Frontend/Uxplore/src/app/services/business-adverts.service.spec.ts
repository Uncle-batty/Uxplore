import { TestBed } from '@angular/core/testing';

import { BusinessAdvertsService } from './business-adverts.service';

describe('BusinessAdvertsService', () => {
  let service: BusinessAdvertsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessAdvertsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
