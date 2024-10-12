import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreRequestComponent } from './store-request.component';

describe('StoreRequestComponent', () => {
  let component: StoreRequestComponent;
  let fixture: ComponentFixture<StoreRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreRequestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StoreRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
