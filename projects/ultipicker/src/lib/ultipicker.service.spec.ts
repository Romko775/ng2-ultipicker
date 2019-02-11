import { TestBed } from '@angular/core/testing';

import { UltipickerService } from './ultipicker.service';

describe('UltipickerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UltipickerService = TestBed.get(UltipickerService);
    expect(service).toBeTruthy();
  });
});
