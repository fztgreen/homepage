import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterOutlet } from '@angular/router';
import { interval } from 'rxjs';
import { svgs } from './assets/svgs';
import { NavigationComponent } from './navigation/navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent, MatSlideToggleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'homepage';
  darkModeToggleChecked = true;
  destroyRef = inject(DestroyRef);

  @ViewChild('darkModeSwitch', { read: ElementRef }) darkModeToggle:
    | ElementRef
    | undefined;

  ngOnInit(): void {
    this.loadTheme();

    this.setupThemeListener();
  }

  ngAfterViewInit(): void {
    this.swapDarkModeToggleIcons();
  }

  setTheme(value: any) {
    if (value.checked) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else if (!value.checked) {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.add('light');
      }
    }
  }

  private loadTheme() {
    let theme = localStorage.getItem('theme');

    if (theme === null) {
      localStorage.setItem('theme', 'dark');
    }

    if (theme === 'dark') {
      this.darkModeToggleChecked = true;
      this.setTheme({ checked: true });
    }

    if (theme === 'light') {
      this.darkModeToggleChecked = false;
      this.setTheme({ checked: false });
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

  private setupThemeListener() {
    interval(250)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.loadTheme();
      });
  }
}
