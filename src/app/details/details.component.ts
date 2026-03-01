import { Component, EventEmitter, Output } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HeadshotComponent } from "../headshot/headshot.component";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [MatListModule, MatDividerModule, MatSlideToggleModule, HeadshotComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  @Output() swipeEmitter: EventEmitter<string> = new EventEmitter<string>();
  notifySwipe(swipe: string) {
    this.swipeEmitter.emit(swipe);
  }
}
