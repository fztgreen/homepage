import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotographyComponent } from './photography.component';

describe('PhotographyComponent', () => {
  let component: PhotographyComponent;
  let fixture: ComponentFixture<PhotographyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotographyComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
