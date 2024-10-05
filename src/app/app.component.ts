import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterOutlet } from '@angular/router';
import { interval } from 'rxjs';
import { NavigationComponent } from './navigation/navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent, MatSlideToggleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'homepage';
  checked = true;
  destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.loadTheme();

    interval(250)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.loadTheme();
      });
  }

  private loadTheme() {
    let theme = localStorage.getItem('theme');

    if (theme === null) {
      localStorage.setItem('theme', 'dark');
    }

    if (theme === 'dark') {
      this.checked = true;
      this.setTheme({ checked: true });
    }

    if (theme === 'light') {
      this.checked = false;
      this.setTheme({ checked: false });
    }
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
}
