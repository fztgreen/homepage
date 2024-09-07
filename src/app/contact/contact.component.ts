import { Component, EventEmitter, Output, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [MatIconModule, MatDividerModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  @Output() swipeEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);

    iconRegistry.addSvgIcon(
      'bmc',
      sanitizer.bypassSecurityTrustResourceUrl('bmc-brand-icon.svg')
    );
  }

  notifySwipe(swipe: string) {
    this.swipeEmitter.emit(swipe);
  }
}
