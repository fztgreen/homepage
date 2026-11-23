import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Random } from 'random-test-values';
import { DownloadComponent } from './download.component';

describe('DownloadComponent', () => {
  let component: DownloadComponent;
  let fixture: ComponentFixture<DownloadComponent>;

  beforeEach(async () => {
    localStorage.removeItem('upload');

    await TestBed.configureTestingModule({
      imports: [DownloadComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function randomFile(): File {
    const name = `${Random.String({ whiteListString: 'abcdefghijklmnopqrstuvwxyz', minLength: 1, maxLength: 20 })}.txt`;
    return new File([Random.String()], name);
  }

  function fileInputChange(files: File[]): Event {
    const dataTransfer = new DataTransfer();
    files.forEach((file) => dataTransfer.items.add(file));
    const input = document.createElement('input');
    input.type = 'file';
    input.files = dataTransfer.files;
    return { target: input } as unknown as Event;
  }

  it('should create', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  describe('uploadFile', () => {
    it('should keep the selected file', () => {
      // Arrange
      const file = randomFile();

      // Act
      component.uploadFile(fileInputChange([file]));

      // Assert
      expect(component.file).toBe(file);
    });

    it('should clear the file when the selection is cancelled', () => {
      // Arrange
      component.file = randomFile();

      // Act
      component.uploadFile(fileInputChange([]));

      // Assert
      expect(component.file).toBeUndefined();
    });

    it('should not write the file to local storage', () => {
      // Arrange
      const file = randomFile();

      // Act
      component.uploadFile(fileInputChange([file]));

      // Assert
      expect(localStorage.getItem('upload')).toBeNull();
    });
  });
});
