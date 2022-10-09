import { TestBed } from '@angular/core/testing';

import { UpdateTrainService } from './update-train.service';

describe('UpdateTrainService', () => {
  let service: UpdateTrainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateTrainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
