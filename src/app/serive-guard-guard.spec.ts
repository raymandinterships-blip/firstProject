import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { seriveGuardGuard } from './serive-guard-guard';

describe('seriveGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => seriveGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
