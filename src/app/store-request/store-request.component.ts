import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-store-request',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  templateUrl: './store-request.component.html',
  styleUrl: './store-request.component.scss'
})
export class StoreRequestComponent {
  subject: FormControl<string | null> = new FormControl<string>('');
  requestDetails: FormControl<string | null> = new FormControl<string>('');
}
