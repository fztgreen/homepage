import { provideHttpClient } from '@angular/common/http';
import {
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NavigationEnd, provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { Random } from 'random-test-values';
import { filter, firstValueFrom } from 'rxjs';
import { routes } from '../app.routes';
import { svgs } from '../assets/svgs';
import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationComponent],
      providers: [
        provideHttpClient(),
        provideAnimations(),
        provideRouter(routes),
        provideLuxonDateAdapter()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    document.body.style.width = '';
  });

  function switchIconPath(state: 'on' | 'off'): string | null | undefined {
    return (fixture.nativeElement as HTMLElement)
      .querySelector(`.theme-toggle .mdc-switch__icon--${state} path`)
      ?.getAttribute('d');
  }

  function nextNavigationEnd(): Promise<NavigationEnd> {
    return firstValueFrom(
      TestBed.inject(Router).events.pipe(
        filter((event) => event instanceof NavigationEnd)
      )
    );
  }

  it('should create', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  describe('tab_num', () => {
    it('should match the number of tabs', () => {
      // Assert
      expect(component.tab_num).not.toBeUndefined();
      expect(component.tab_num).toBe(component.tabs.length);
    });
  });

  describe('selected', () => {
    it('should select the tab named in the URL path', async () => {
      // Arrange
      const labels = component.tabs.map((tab) => tab.textLabel);
      const index = Random.Number({ min: 1, max: labels.length });
      const harness = await RouterTestingHarness.create();

      // Act
      const navigation = await harness.navigateByUrl(
        `/${labels[index].toLowerCase()}`,
        NavigationComponent
      );

      // Assert
      expect(navigation.selected()).toBe(index);
    });

    it('should select the tab named in the URL path when moving from another tab', async () => {
      // Arrange
      const labels = component.tabs.map((tab) => tab.textLabel);
      const index = Random.Number({ min: 1, max: labels.length });
      const harness = await RouterTestingHarness.create('/home');

      // Act
      const navigation = await harness.navigateByUrl(
        `/${labels[index].toLowerCase()}`,
        NavigationComponent
      );

      // Assert
      expect(navigation.selected()).toBe(index);
    });
  });

  describe('tabChange', () => {
    it('should navigate to the path of the selected tab', async () => {
      // Arrange
      const harness = await RouterTestingHarness.create('/home');
      const navigation = harness.routeDebugElement!
        .componentInstance as NavigationComponent;
      const index = Random.Number({ min: 1, max: navigation.tabs.length });
      const tab = navigation.tabs.get(index)!;
      const navigationEnd = nextNavigationEnd();

      // Act
      navigation.tabChange({ index, tab });
      await navigationEnd;

      // Assert
      expect(TestBed.inject(Router).url).toBe(
        `/${tab.textLabel.toLowerCase()}`
      );
    });

    it('should keep showing the navigation when the settings tab opens on mobile', async () => {
      // Arrange
      const harness = await RouterTestingHarness.create('/home');
      const navigation = harness.routeDebugElement!
        .componentInstance as NavigationComponent;
      navigation.mobileView = true;
      harness.detectChanges();
      const index = navigation.tabs.length - 1;
      const navigationEnd = nextNavigationEnd();

      // Act
      navigation.tabChange({ index, tab: navigation.tabs.get(index)! });
      await navigationEnd;

      // Assert
      expect(harness.routeDebugElement!.componentInstance).toBe(navigation);
    });
  });

  describe('darkModeToggle', () => {
    it('should show the moon and sun icons when the settings tab opens on mobile', fakeAsync(() => {
      // Arrange
      component.mobileView = true;
      fixture.detectChanges();

      // Act
      component.selected.set(component.tabs.length - 1);
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      discardPeriodicTasks();

      // Assert
      expect(switchIconPath('on')).toBe(svgs.moon);
      expect(switchIconPath('off')).toBe(svgs.sun);
    }));
  });

  describe('mobileView', () => {
    it('should default to false', () => {
      // Assert
      expect(component.mobileView).toBeFalse();
    });

    it('should be true when the page is exactly the mobile width', () => {
      // Arrange
      document.body.style.width = '700px';

      // Act
      const narrowFixture = TestBed.createComponent(NavigationComponent);
      narrowFixture.detectChanges();

      // Assert
      expect(narrowFixture.componentInstance.mobileView).toBeTrue();
    });
  });

  describe('swipe', () => {
    describe('left', () => {
      it('should move right one tab', () => {
        // Arrange
        component.selected.set(0);
        component.tab_num = 2;

        // Act
        component.swipe('swipeleft');

        // Assert
        expect(component.selected()).toBe(1);
      });

      it('should not move above max tabs', () => {
        // Arrange
        component.selected.set(0);
        component.tab_num = 1;

        // Act
        component.swipe('swipeleft');

        // Assert
        expect(component.selected()).toBe(0);
      });
    });

    describe('right', () => {
      it('should move left one tab', () => {
        // Arrange
        component.selected.set(1);

        // Act
        component.swipe('swiperight');

        // Assert
        expect(component.selected()).toBe(0);
      });

      it('should not move left of first tab', () => {
        // Arrange
        component.selected.set(0);

        // Act
        component.swipe('swiperight');

        // Assert
        expect(component.selected()).toBe(0);
      });
    });

    describe('bad input', () => {
      it('should do nothing', () => {
        // Arrange
        component.selected.set(1);

        // Act
        component.swipe('blah');

        // Assert
        expect(component.selected()).toBe(1);
      });
    });
  });
});
