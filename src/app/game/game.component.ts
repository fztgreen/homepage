import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  count: number = 0;

  increment(): void {
    this.count += 1;
  }
}
