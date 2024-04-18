import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guardianGuard } from './guardian.guard';

describe('guardianGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guardianGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
