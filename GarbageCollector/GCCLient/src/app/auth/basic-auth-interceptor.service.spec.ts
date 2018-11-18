import { TestBed, inject } from '@angular/core/testing';

import { BasicAuthInterceptorService } from './basic-auth-interceptor.service';

describe('BasicAuthInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BasicAuthInterceptorService]
    });
  });

  it('should be created', inject([BasicAuthInterceptorService], (service: BasicAuthInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
