import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  MatTab,
  MatTabChangeEvent,
  MatTabGroup,
  MatTabsModule,
} from '@angular/material/tabs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BlogComponent } from '../blog/blog.component';
import { ContactComponent } from '../contact/contact.component';
import { DetailsComponent } from '../details/details.component';
import { PhotographyComponent } from '../photography/photography.component';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    MatTabsModule,
    DetailsComponent,
    ContactComponent,
    BlogComponent,
    PhotographyComponent,
    RouterModule,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements AfterViewInit {
  destroyRef = inject(DestroyRef);
  @ViewChild(MatTabGroup) group: any;
  @ViewChildren(MatTab) tabs: any;
  tab_num = 0;
  selected = 0;
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  home: string = 'home';

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
  ) {}

  ngAfterViewInit() {
    this._route.fragment
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((fragment) => {
        this.navigateToTabFromFragment(fragment);
      });

    this.tab_num = this.tabs.length;
  }

  private navigateToTabFromFragment(fragment: string | null) {
    let tab = this.tabs.find((x: any): boolean => {
      return x.textLabel.toLowerCase() == fragment?.toLowerCase();
    });

    for (let x = 0; x < this.tabs.length; x++) {
      if (this.tabs.get(x) == tab) {
        this.selected = x;
      }
    }
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

  tabChange(tab: MatTabChangeEvent) {
    this.selected = tab.index;
    this._router.navigate([], { fragment: tab.tab.textLabel });
  }
}
