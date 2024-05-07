import { TestBed } from '@angular/core/testing';

import { AdminDepositesService } from './admin-deposites.service';

describe('AdminDepositesService', () => {
  let service: AdminDepositesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminDepositesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
