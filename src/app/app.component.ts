import { Component, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterOutlet } from '@angular/router';
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

  ngOnInit(): void {
    this.loadTheme();
  }

  private loadTheme() {
    let theme = localStorage.getItem('theme');

    if (theme === null) {
      localStorage.setItem('theme', 'dark');
    }

    if (theme === 'dark') {
      this.setTheme({ checked: true });
      this.checked = true;
    }

    if (theme === 'light') {
      this.setTheme({ checked: false });
      this.checked = false;
    }
  }

  setTheme(value: any) {
    localStorage.setItem('theme', value);

    if (value.checked) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    } else if (!value.checked) {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
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
