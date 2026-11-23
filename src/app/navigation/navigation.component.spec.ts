import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { Random } from 'random-test-values';
import { routes } from '../app.routes';
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

  it('should create', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should correctly set amount of tabs', () => {
    // Assert
    expect(component.tab_num).not.toBeUndefined();
    expect(component.tab_num).toBe(component.tabs.length);
  });

  describe('selected', () => {
    it('should select the tab named in the URL fragment', async () => {
      // Arrange
      const labels = component.tabs.map((tab) => tab.textLabel);
      const index = Random.Number({ min: 1, max: labels.length });
      const harness = await RouterTestingHarness.create();

      // Act
      const navigation = await harness.navigateByUrl(
        `/home#${labels[index]}`,
        NavigationComponent
      );

      // Assert
      expect(navigation.selected()).toBe(index);
    });
  });

  describe('mobileView', () => {
    it('should default to false', () => {
      // Assert
      expect(component.mobileView).toBeFalse();
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
