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
  const homeSections = ['home', 'contact', 'photography', 'blog'];
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

  function randomHomeSectionOtherThan(section: string): string {
    const others = homeSections.filter((other) => other !== section);
    return others[Random.Number({ min: 0, max: others.length })];
  }

  function randomSegment(): string {
    return Random.String({
      whiteListString: 'abcdefghijklmnopqrstuvwxyz',
      minLength: 1,
      maxLength: 10
    });
  }

  function notLowercase(text: string): string {
    const [first, ...rest] = [...text];
    return [
      first.toUpperCase(),
      ...rest.map((letter) =>
        Random.Boolean() ? letter.toUpperCase() : letter.toLowerCase()
      )
    ].join('');
  }

  describe('home sections', () => {
    it('should keep the section path in the URL', async () => {
      // Arrange
      const url = `/${randomHomeSection()}`;

      // Act
      await harness.navigateByUrl(url, NavigationComponent);

      // Assert
      expect(TestBed.inject(Router).url).toBe(url);
    });

    it('should show the navigation when a section path is not lowercase', async () => {
      // Arrange
      const url = `/${notLowercase(randomHomeSection())}`;

      // Act
      const navigation = await harness.navigateByUrl(url, NavigationComponent);

      // Assert
      expect(navigation).toBeInstanceOf(NavigationComponent);
    });

    it('should keep the same navigation when moving between sections', async () => {
      // Arrange
      const from = randomHomeSection();
      const to = randomHomeSectionOtherThan(from);
      const navigation = await harness.navigateByUrl(
        `/${from}`,
        NavigationComponent
      );

      // Act
      const navigationAfterMove = await harness.navigateByUrl(
        `/${to}`,
        NavigationComponent
      );

      // Assert
      expect(navigationAfterMove).toBe(navigation);
    });

    it('should redirect details to home', async () => {
      // Arrange
      const url = `/${notLowercase('details')}`;

      // Act
      await harness.navigateByUrl(url, NavigationComponent);

      // Assert
      expect(TestBed.inject(Router).url).toBe('/home');
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
