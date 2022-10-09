import { TestBed } from '@angular/core/testing';

import { CancelTicketService } from './cancel-ticket.service';

describe('CancelTicketService', () => {
  let service: CancelTicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CancelTicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
