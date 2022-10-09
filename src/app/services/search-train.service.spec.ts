import { TestBed } from '@angular/core/testing';

import { SearchTrainService } from './search-train.service';

describe('SearchTrainService', () => {
  let service: SearchTrainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchTrainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
