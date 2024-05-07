import { TestBed } from '@angular/core/testing';

import { UserLoanService } from './user-loan.service';

describe('UserLoanService', () => {
  let service: UserLoanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserLoanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
