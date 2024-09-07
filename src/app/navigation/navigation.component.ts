import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MatTab, MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import 'hammerjs';
import { ContactComponent } from '../contact/contact.component';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [MatTabsModule, DetailsComponent, ContactComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements AfterViewInit {
  @ViewChild(MatTabGroup) group: any;
  @ViewChildren(MatTab) tabs: any;
  tab_num = 0;
  selected = 0;
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

  ngAfterViewInit() {
    this.tab_num = this.tabs.length;
  }

  swipe(eType: any) {
    if (eType === this.SWIPE_ACTION.RIGHT && this.selected > 0) {
      this.selected--;
    } else if (
      eType === this.SWIPE_ACTION.LEFT &&
      this.selected < this.tab_num - 1
    ) {
      this.selected++;
    }
  }
}
