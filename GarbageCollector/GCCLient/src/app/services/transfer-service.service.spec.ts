import { TestBed, inject } from '@angular/core/testing';

import { TransferServiceService } from './transfer-service.service';

describe('TransferServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransferServiceService]
    });
  });

  it('should be created', inject([TransferServiceService], (service: TransferServiceService) => {
    expect(service).toBeTruthy();
  }));
});
