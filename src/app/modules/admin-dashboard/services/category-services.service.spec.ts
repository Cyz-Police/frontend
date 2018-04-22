import { TestBed, inject } from '@angular/core/testing';

import { CategoryServicesService } from './category-services.service';

describe('CategoryServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryServicesService]
    });
  });

  it('should be created', inject([CategoryServicesService], (service: CategoryServicesService) => {
    expect(service).toBeTruthy();
  }));
});
