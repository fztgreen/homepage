import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreServiceComponent } from './store-service.component';

describe('StoreServiceComponent', () => {
  let component: StoreServiceComponent;
  let fixture: ComponentFixture<StoreServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreServiceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StoreServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
