import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { interval } from 'rxjs';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [ MatButtonModule ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  destroyRef = inject(DestroyRef);
  count: number = 0;
  autoclickerTotal: number = 0;
  buttonEnabled: boolean = true;

  increment(): void {
    this.count += 1;
  }

  startAutoclicker(): void {
    this.buttonEnabled = false;
    interval(1000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.count += 1;
        this.buttonEnabled = true;
      });

    this.autoclickerTotal += 1;
  }
}
