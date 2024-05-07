import { TestBed } from '@angular/core/testing';

import { UserDepositService } from './user-deposit.service';

describe('UserDepositService', () => {
  let service: UserDepositService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDepositService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
