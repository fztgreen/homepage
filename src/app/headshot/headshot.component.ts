import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-headshot',
  standalone: true,
  imports: [MatDividerModule],
  templateUrl: './headshot.component.html',
  styleUrl: './headshot.component.scss'
})
export class HeadshotComponent {

}
