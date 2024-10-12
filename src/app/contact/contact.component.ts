import { Component, EventEmitter, Output, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DomSanitizer } from '@angular/platform-browser';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatTooltipModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  @Output() swipeEmitter: EventEmitter<string> = new EventEmitter<string>();
  private _snackBar = inject(MatSnackBar);
  contactForm: FormGroup = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    message: new FormControl<string>('', [Validators.required]),
    respondByDate: new FormControl<DateTime | null>(null)
  });

  readonly minDate = new Date();

  constructor() {
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);

    iconRegistry.addSvgIcon(
      'bmc',
      sanitizer.bypassSecurityTrustResourceUrl('assets/bmc-brand-icon.svg')
    );
  }

  notifySwipe(swipe: string) {
    this.swipeEmitter.emit(swipe);
  }

  openConfirmation(message: string, action: string) {
    if (this.contactForm.valid) {
      this._snackBar.open(message, action);
    }
  }
}
