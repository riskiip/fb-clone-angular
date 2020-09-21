import { TestBed, async, inject } from '@angular/core/testing';

import { FacebookGuard } from './facebook.guard';

describe('FacebookGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacebookGuard]
    });
  });

  it('should ...', inject([FacebookGuard], (guard: FacebookGuard) => {
    expect(guard).toBeTruthy();
  }));
});
