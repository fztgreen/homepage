import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { Random } from 'random-test-values';
import { GithubService } from './github.service';

describe('GithubService', () => {
  let service: GithubService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(GithubService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  function randomUrl(): string {
    return `https://api.github.com/repos/${Random.String({ whiteListString: 'abcdefghijklmnopqrstuvwxyz', minLength: 1, maxLength: 20 })}/readme`;
  }

  function randomReadme(whiteListString: string): string {
    return Random.String({ whiteListString, minLength: 1, maxLength: 50 });
  }

  function base64OfUtf8(text: string): string {
    const bytes = new TextEncoder().encode(text);
    return btoa(String.fromCharCode(...bytes));
  }

  it('should be created', () => {
    // Assert
    expect(service).toBeTruthy();
  });

  describe('getReadMe', () => {
    it('should decode an ASCII README', () => {
      // Arrange
      const url = randomUrl();
      const readme = randomReadme('abcdefghijklmnopqrstuvwxyz #*-\n');
      let decoded: string | undefined;

      // Act
      service.getReadMe(url).subscribe((text) => (decoded = text));
      httpTestingController.expectOne(url).flush({ content: btoa(readme) });

      // Assert
      expect(decoded).toBe(readme);
    });

    it('should decode a README with non-ASCII characters as UTF-8', () => {
      // Arrange
      const url = randomUrl();
      const readme = randomReadme('aéüñßçø漢字—“”✓ ');
      let decoded: string | undefined;

      // Act
      service.getReadMe(url).subscribe((text) => (decoded = text));
      httpTestingController
        .expectOne(url)
        .flush({ content: base64OfUtf8(readme) });

      // Assert
      expect(decoded).toBe(readme);
    });
  });
});
