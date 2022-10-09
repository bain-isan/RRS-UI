import { TestBed } from '@angular/core/testing';

import { TrainListService } from './train-list.service';

describe('TrainListService', () => {
  let service: TrainListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
