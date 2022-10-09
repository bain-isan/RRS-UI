import { TestBed } from '@angular/core/testing';

import { AddTrainService } from './add-train.service';

describe('AddTrainService', () => {
  let service: AddTrainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddTrainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
