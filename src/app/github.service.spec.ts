import { TestBed } from '@angular/core/testing';

import { GithubService } from './github.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('GithubService', () => {
  let service: GithubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withInterceptorsFromDi())]
    });
    service = TestBed.inject(GithubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
