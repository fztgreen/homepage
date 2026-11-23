import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let savedTheme: string | null;

  beforeEach(async () => {
    savedTheme = localStorage.getItem('theme');

    await TestBed.configureTestingModule({
      imports: [AppComponent]
    }).compileComponents();
  });

  afterEach(() => {
    restoreSavedTheme();
  });

  function restoreSavedTheme(): void {
    if (savedTheme === null) {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', savedTheme);
    }
  }

  function clearAppliedTheme(): void {
    document.documentElement.classList.remove('dark', 'light');
  }

  it('should create the app', () => {
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    // Assert
    expect(app).toBeTruthy();
  });

  describe('title', () => {
    it(`should be 'homepage'`, () => {
      // Arrange
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;

      // Assert
      expect(app.title).toEqual('homepage');
    });
  });

  describe('ngOnInit', () => {
    it('should apply the dark theme on a first visit', () => {
      // Arrange
      localStorage.removeItem('theme');
      clearAppliedTheme();
      const fixture = TestBed.createComponent(AppComponent);

      // Act
      fixture.detectChanges();

      // Assert
      expect(document.documentElement.classList).toContain('dark');
      expect(localStorage.getItem('theme')).toBe('dark');
    });
  });
});
