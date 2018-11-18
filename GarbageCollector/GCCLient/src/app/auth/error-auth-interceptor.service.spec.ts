import { TestBed, inject } from '@angular/core/testing';

import { ErrorAuthInterceptorService } from './error-auth-interceptor.service';

describe('ErrorAuthInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorAuthInterceptorService]
    });
  });

  it('should be created', inject([ErrorAuthInterceptorService], (service: ErrorAuthInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
