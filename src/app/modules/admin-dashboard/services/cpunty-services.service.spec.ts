import { TestBed, inject } from '@angular/core/testing';

import { CpuntyServicesService } from './cpunty-services.service';

describe('CpuntyServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CpuntyServicesService]
    });
  });

  it('should be created', inject([CpuntyServicesService], (service: CpuntyServicesService) => {
    expect(service).toBeTruthy();
  }));
});
