import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { StoreServiceComponent } from './store-service.component';

describe('StoreServiceComponent', () => {
  let component: StoreServiceComponent;
  let fixture: ComponentFixture<StoreServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreServiceComponent],
      providers: [{ provide: ActivatedRoute, useValue: { url: of() } }]
    }).compileComponents();

    fixture = TestBed.createComponent(StoreServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
