import { TestBed } from '@angular/core/testing';

import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { Random } from 'random-test-values';
import { routes } from '../app.routes';
import { StoreComponent } from './store.component';

describe('StoreComponent', () => {
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)]
    });

    harness = await RouterTestingHarness.create();
  });

  function randomWord(): string {
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

  function showsWelcomeMessage(): boolean {
    return (
      harness.routeNativeElement?.querySelector('.welcome-message') !== null
    );
  }

  it('should create', async () => {
    // Act
    const component = await harness.navigateByUrl('/store', StoreComponent);

    // Assert
    expect(component).toBeTruthy();
  });

  describe('isBaseStorePage', () => {
    it('should show the welcome message on /store', async () => {
      // Act
      await harness.navigateByUrl('/store', StoreComponent);

      // Assert
      expect(showsWelcomeMessage()).toBeTrue();
    });

    it('should show the welcome message when the URL has a query string', async () => {
      // Act
      await harness.navigateByUrl(
        `/store?${randomWord()}=${randomWord()}`,
        StoreComponent
      );

      // Assert
      expect(showsWelcomeMessage()).toBeTrue();
    });

    it('should show the welcome message when the URL has a fragment', async () => {
      // Act
      await harness.navigateByUrl(`/store#${randomWord()}`, StoreComponent);

      // Assert
      expect(showsWelcomeMessage()).toBeTrue();
    });

    it('should show the welcome message when the path is not lowercase', async () => {
      // Act
      await harness.navigateByUrl(`/${randomCasing('STORE')}`, StoreComponent);

      // Assert
      expect(showsWelcomeMessage()).toBeTrue();
    });

    it('should hide the welcome message on a child page', async () => {
      // Act
      await harness.navigateByUrl(`/store/${randomWord()}`, StoreComponent);

      // Assert
      expect(showsWelcomeMessage()).toBeFalse();
    });
  });
});
