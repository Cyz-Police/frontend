import { TestBed, inject } from '@angular/core/testing';

import { TypeServicesService } from './type-services.service';

describe('TypeServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TypeServicesService]
    });
  });

  it('should be created', inject([TypeServicesService], (service: TypeServicesService) => {
    expect(service).toBeTruthy();
  }));
});
