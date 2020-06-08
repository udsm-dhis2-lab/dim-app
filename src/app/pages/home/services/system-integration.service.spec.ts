import { TestBed } from '@angular/core/testing';

import { SystemIntegrationService } from './system-integration.service';

describe('SystemIntegrationService', () => {
  let service: SystemIntegrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemIntegrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
