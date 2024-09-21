import { NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  ViewChildren,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import {
  MatTab,
  MatTabChangeEvent,
  MatTabsModule,
} from '@angular/material/tabs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, take } from 'rxjs';
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
    MatIconModule,
    NgTemplateOutlet,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements AfterViewInit {
  destroyRef = inject(DestroyRef);
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
    switch (
      this._route.snapshot.pathFromRoot[1].firstChild?.routeConfig?.path
    ) {
      case 'details':
        this.selected = 0;
        break;
      case 'contact':
        this.selected = 1;
        break;
      case 'blog':
        this.selected = 2;
        break;
      case 'photography':
        this.selected = 3;
        break;
    }

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

  tabChange(tab: MatTabChangeEvent) {
    this._router.navigate([`${tab.tab.textLabel.toLocaleLowerCase()}`], {
      relativeTo: this._route,
    });
  }

  componentAdded(event: any) {
    (event.swipeEmitter as Observable<string> | undefined)
      ?.pipe(takeUntilDestroyed(this.destroyRef), take(1))
      .subscribe((s) => this.swipe(s));
  }
}
