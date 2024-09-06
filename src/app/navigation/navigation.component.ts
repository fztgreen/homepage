import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { DetailsComponent } from '../details/details.component';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [MatTabsModule, DetailsComponent, ContactComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {

}
