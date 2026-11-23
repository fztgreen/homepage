import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent]
    }).compileComponents();
  });

  it('should create the app', () => {
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    // Assert
    expect(app).toBeTruthy();
  });

  it(`should have the 'homepage' title`, () => {
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    // Assert
    expect(app.title).toEqual('homepage');
  });
});
