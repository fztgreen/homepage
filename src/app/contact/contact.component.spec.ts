import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let snackbarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    snackbarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [
        provideHttpClient(),
        provideAnimations(),
        { provide: MatSnackBar, useValue: snackbarSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('openConfirmation', () => {
    it('should open snackbar', () => {
      // Arrange
      component.contactForm.controls['name'].setValue('anything');
      component.contactForm.controls['message'].setValue('anything');

      // Act
      component.openConfirmation('Message Sent!', 'OK');

      // Assert
      expect(snackbarSpy.open).toHaveBeenCalledOnceWith('Message Sent!', 'OK');
    });

    describe('and name is not supplied', () => {
      it('should not do anything', () => {
        // Arrange
        component.contactForm.controls['name'].setValue('');
        component.contactForm.controls['message'].setValue('anything');

        // Act
        component.openConfirmation('Message Sent!', 'OK');

        // Assert
        expect(snackbarSpy.open).not.toHaveBeenCalled();
      });
    });

    describe('and message is not supplied', () => {
      it('should not do anything', () => {
        // Arrange
        component.contactForm.controls['name'].setValue('anything');
        component.contactForm.controls['message'].setValue('');

        // Act
        component.openConfirmation('Message Sent!', 'OK');

        // Assert
        expect(snackbarSpy.open).not.toHaveBeenCalled();
      });
    });
  });
});
