import { Component, EventEmitter, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [MatCardModule, MatDividerModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  @Output() swipeEmitter: EventEmitter<string> = new EventEmitter<string>();

  notifySwipe(swipe: string) {
    this.swipeEmitter.emit(swipe);
  }
}
