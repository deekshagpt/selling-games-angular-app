import { TestBed } from '@angular/core/testing';

import { SellingGamesService } from './selling-games.service';

describe('SellingGamesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SellingGamesService = TestBed.get(SellingGamesService);
    expect(service).toBeTruthy();
  });
});
