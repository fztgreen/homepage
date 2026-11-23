import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import {
  MatSlideToggleChange,
  MatSlideToggleModule
} from '@angular/material/slide-toggle';
import {
  MatTab,
  MatTabChangeEvent,
  MatTabsModule
} from '@angular/material/tabs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { interval } from 'rxjs';
import { svgs } from '../assets/svgs';
import { BlogComponent } from '../blog/blog.component';
import { ContactComponent } from '../contact/contact.component';
import { DetailsComponent } from '../details/details.component';
import { PhotographyComponent } from '../photography/photography.component';

@Component({
  selector: 'app-navigation',
  imports: [
    MatTabsModule,
    DetailsComponent,
    ContactComponent,
    BlogComponent,
    PhotographyComponent,
    RouterModule,
    MatIconModule,
    MatSlideToggleModule
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements AfterViewInit, OnInit {
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);

  private _destroyRef = inject(DestroyRef);
  @ViewChildren(MatTab) tabs!: QueryList<MatTab>;
  tab_num = 0;
  selected = 0;
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  home = 'home';
  darkModeToggleChecked = false;
  mobileView = false;

  @ViewChild('darkModeSwitch', { read: ElementRef }) darkModeToggle:
    | ElementRef
    | undefined;

  ngOnInit(): void {
    this.darkModeToggleChecked = localStorage.getItem('theme') === 'dark';

    this.mobileView = document.body.offsetWidth < 700;

    this.setupDarkModeListener();
  }

  private setupDarkModeListener() {
    interval(1000)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => {
        this.darkModeToggleChecked = localStorage.getItem('theme') === 'dark';
        this.mobileView = document.body.offsetWidth < 700;
      });
  }

  ngAfterViewInit() {
    this._route.fragment
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((fragment) => {
        this.navigateToTabFromFragment(fragment);
      });

    this.tab_num = this.tabs.length;
    this.swapDarkModeToggleIcons();
  }

  swipe(eType: string) {
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

  setTheme(value: Pick<MatSlideToggleChange, 'checked'>) {
    if (value.checked) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  }

  private swapDarkModeToggleIcons() {
    if (this.darkModeToggle) {
      this.darkModeToggle.nativeElement
        .querySelector('.mdc-switch__icon--on')
        .firstChild.setAttribute('d', svgs.moon);
      this.darkModeToggle.nativeElement
        .querySelector('.mdc-switch__icon--off')
        .firstChild.setAttribute('d', svgs.sun);
    }
  }

  private navigateToTabFromFragment(fragment: string | null) {
    const tab = this.tabs.find(
      (x) => x.textLabel.toLowerCase() === fragment?.toLowerCase()
    );

    for (let x = 0; x < this.tabs.length; x++) {
      if (this.tabs.get(x) === tab) {
        this.selected = x;
      }
    }
  }
}
