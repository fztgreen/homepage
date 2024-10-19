import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute, Router } from '@angular/router';
import { StoreComponent } from './store.component';

describe('StoreComponent', () => {
  let component: StoreComponent;
  let fixture: ComponentFixture<StoreComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj<Router>('Router', [], ['url']);

    await TestBed.configureTestingModule({
      imports: [StoreComponent],
      providers: [
        { provide: Router, use: routerSpy },
        { provide: ActivatedRoute, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
