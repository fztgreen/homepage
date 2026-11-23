import {
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { Random } from 'random-test-values';
import { GameComponent } from './game.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  describe('increment', () => {
    it('should increase count by 1', () => {
      // Arrange
      const randomCount = Random.Number({ min: 0 });
      component.count = randomCount;

      // Act
      component.increment();

      // Assert
      expect(component.count).toBe(randomCount + 1);
    });
  });

  describe('count', () => {
    it('should default to 0', () => {
      // Assert
      expect(component.count).toBe(0);
    });
  });

  describe('startAutoclicker', () => {
    it('should increase count by 1 every 1000 ms', fakeAsync(() => {
      // Arrange
      component.count = 0;

      // Act
      component.startAutoclicker();
      tick(1001);

      // Assert
      expect(component.count).toBe(1);

      // Act
      tick(1001);

      // Assert
      expect(component.count).toBe(2);

      discardPeriodicTasks();
    }));

    it('should increase autoclicker total by 1', fakeAsync(() => {
      // Arrange
      const autoclickerTotal = Random.Number({ min: 0 });
      component.autoclickerTotal = autoclickerTotal;

      // Act
      component.startAutoclicker();

      // Assert
      expect(component.autoclickerTotal).toBe(autoclickerTotal + 1);

      discardPeriodicTasks();
    }));

    it('should set button to handle button disabling until first increment', fakeAsync(() => {
      // Arrange
      component.buttonEnabled = true;

      // Act
      component.startAutoclicker();

      // Assert
      expect(component.buttonEnabled).toBeFalse();

      // Act
      tick(1001);

      // Assert
      expect(component.buttonEnabled).toBeTrue();

      discardPeriodicTasks();
    }));
  });
});
