import {
  afterRenderEffect,
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  QueryList,
  signal,
  viewChild,
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
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule
} from '@angular/router';
import { filter, interval, map, startWith } from 'rxjs';
import { svgs } from '../assets/svgs';
import { BlogComponent } from '../blog/blog.component';
import { ContactComponent } from '../contact/contact.component';
import { DetailsComponent } from '../details/details.component';
import { PhotographyComponent } from '../photography/photography.component';
import { ViewportService } from '../viewport.service';

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
  private _viewport = inject(ViewportService);

  private _destroyRef = inject(DestroyRef);
  @ViewChildren(MatTab) tabs!: QueryList<MatTab>;
  tab_num = 0;
  selected = signal(0);
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  home = 'home';
  darkModeToggleChecked = false;
  mobileView = false;

  private _darkModeToggle = viewChild('darkModeSwitch', { read: ElementRef });

  // The switch is in the mobile-only Settings tab, so it can appear long after
  // the first render; swap its icons each time it does.
  constructor() {
    afterRenderEffect(() => {
      const toggle = this._darkModeToggle();
      if (toggle) {
        this.swapDarkModeToggleIcons(toggle.nativeElement);
      }
    });
  }

  ngOnInit(): void {
    this.darkModeToggleChecked = localStorage.getItem('theme') === 'dark';

    this.mobileView = this._viewport.isMobileView();

    this.setupDarkModeListener();
  }

  private setupDarkModeListener() {
    interval(1000)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => {
        this.darkModeToggleChecked = localStorage.getItem('theme') === 'dark';
        this.mobileView = this._viewport.isMobileView();
      });
  }

  ngAfterViewInit() {
    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(null),
        map(() => this.activeTabPath()),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe((path) => {
        this.selectTabNamed(path);
      });

    this.tab_num = this.tabs.length;
  }

  swipe(eType: string) {
    if (eType === this.SWIPE_ACTION.RIGHT && this.selected() > 0) {
      this.selected.update((index) => index - 1);
    } else if (
      eType === this.SWIPE_ACTION.LEFT &&
      this.selected() < this.tab_num - 1
    ) {
      this.selected.update((index) => index + 1);
    }
  }

  tabChange(tab: MatTabChangeEvent) {
    this.selected.set(tab.index);
    this._router.navigate(['/', tab.tab.textLabel.toLowerCase()]);
  }

  setTheme(value: Pick<MatSlideToggleChange, 'checked'>) {
    if (value.checked) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  }

  private swapDarkModeToggleIcons(toggle: HTMLElement) {
    toggle
      .querySelector('.mdc-switch__icon--on path')
      ?.setAttribute('d', svgs.moon);
    toggle
      .querySelector('.mdc-switch__icon--off path')
      ?.setAttribute('d', svgs.sun);
  }

  private activeTabPath(): string | undefined {
    return this._route.firstChild?.snapshot.url[0]?.path;
  }

  private selectTabNamed(name: string | undefined) {
    const tab = this.tabs.find(
      (x) => x.textLabel.toLowerCase() === name?.toLowerCase()
    );

    for (let x = 0; x < this.tabs.length; x++) {
      if (this.tabs.get(x) === tab) {
        this.selected.set(x);
      }
    }
  }
}
