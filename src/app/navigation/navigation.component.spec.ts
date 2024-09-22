import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation.component';
import { provideRouter } from '@angular/router';
import { routes } from '../app.routes';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationComponent],
      providers: [provideHttpClient(), provideAnimations(), provideRouter(routes), provideLuxonDateAdapter()],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly set amount of tabs', () => {
    expect(component.tab_num).not.toBeUndefined();
    expect(component.tab_num).toBe(component.tabs.length);
  });

  describe('swipe', () => {
    describe('left', () => {
      it('should move right one tab', () => {
        // Arrange
        component.selected = 0;
        component.tab_num = 2;

        // Act
        component.swipe('swipeleft');

        // Assert
        expect(component.selected).toBe(1);
      });

      it('should not move above max tabs', () => {
        // Arrange
        component.selected = 0;
        component.tab_num = 1;

        // Act
        component.swipe('swipeleft');

        // Assert
        expect(component.selected).toBe(0);
      });
    });

    describe('right', () => {
      it('should move left one tab', () => {
        // Arrange
        component.selected = 1;

        // Act
        component.swipe('swiperight');

        // Assert
        expect(component.selected).toBe(0);
      });

      it('should not move left of first tab', () => {
        // Arrange
        component.selected = 0;

        // Act
        component.swipe('swiperight');

        // Assert
        expect(component.selected).toBe(0);
      });
    });

    describe('bad input', () => {
      it('should do nothing', () => {
        // Arrange
        component.selected = 1;

        // Act
        component.swipe('blah');

        // Assert
        expect(component.selected).toBe(1);
      });
    });
  });
});
