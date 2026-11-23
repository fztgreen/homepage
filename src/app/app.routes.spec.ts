import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { Random } from 'random-test-values';
import { routes } from './app.routes';
import { NavigationComponent } from './navigation/navigation.component';
import { NotFoundComponent } from './not-found/not-found.component';

describe('routes', () => {
  const homeSections = ['details', 'contact', 'photography', 'blog'];
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes),
        provideLuxonDateAdapter(),
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    harness = await RouterTestingHarness.create();
  });

  function randomHomeSection(): string {
    return homeSections[Random.Number({ min: 0, max: homeSections.length })];
  }

  function randomSegment(): string {
    return Random.String({
      whiteListString: 'abcdefghijklmnopqrstuvwxyz',
      minLength: 1,
      maxLength: 10
    });
  }

  function randomCasing(text: string): string {
    return [...text]
      .map((letter) =>
        Random.Boolean() ? letter.toUpperCase() : letter.toLowerCase()
      )
      .join('');
  }

  describe('home sections', () => {
    it('should redirect a section path in any casing to its home section', async () => {
      // Arrange
      const section = randomHomeSection();

      // Act
      await harness.navigateByUrl(
        `/${randomCasing(section)}`,
        NavigationComponent
      );

      // Assert
      expect(TestBed.inject(Router).url).toBe(`/home#${section}`);
    });

    it('should show not found when a section path has extra segments', async () => {
      // Arrange
      const url = `/${randomHomeSection()}/${randomSegment()}`;

      // Act
      await harness.navigateByUrl(url, NotFoundComponent);

      // Assert
      expect(TestBed.inject(Router).url).toBe(url);
    });
  });
});
