import { TestBed } from '@angular/core/testing';

import { ShadowServiceService } from './shadow-service.service';

describe('ShadowServiceService', () => {
  let service: ShadowServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShadowServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
