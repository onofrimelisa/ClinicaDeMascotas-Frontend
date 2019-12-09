import { TestBed } from '@angular/core/testing';

import { FichaService } from './ficha.service';

describe('FichaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FichaService = TestBed.get(FichaService);
    expect(service).toBeTruthy();
  });
});
