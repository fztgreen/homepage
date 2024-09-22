import {
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Random } from 'random-test-values';
import { GameComponent } from './game.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('increment', () => {
    it('should increase count by 1', () => {
      let randomCount = Random.Number({ min: 0 });
      component.count = randomCount;

      component.increment();

      expect(component.count).toBe(randomCount + 1);
    });
  });

  describe('count', () => {
    it('should default to 0', () => {
      expect(component.count).toBe(0);
    });
  });

  describe('startAutoclicker', () => {
    it('should increase count by 1 every 1000 ms', fakeAsync(() => {
      component.count = 0;

      component.startAutoclicker();

      tick(1001);
      expect(component.count).toBe(1);

      tick(1001);
      expect(component.count).toBe(2);

      discardPeriodicTasks();
    }));

    it('should increase autoclicker total by 1', fakeAsync(() => {
      let autoclickerTotal = Random.Number({ min: 0 });
      component.autoclickerTotal = autoclickerTotal;

      component.startAutoclicker();

      expect(component.autoclickerTotal).toBe(autoclickerTotal + 1);

      discardPeriodicTasks();
    }));

    it('should set button to handle button disabling until first increment', fakeAsync(() => {
      component.buttonEnabled = true;

      component.startAutoclicker();

      expect(component.buttonEnabled).toBeFalse();
      tick(1001);

      expect(component.buttonEnabled).toBeTrue();

      discardPeriodicTasks();
    }));
  });
});
