import { TestBed } from '@angular/core/testing';

import { Random } from 'random-test-values';
import { ViewportService } from './viewport.service';

describe('ViewportService', () => {
  let service: ViewportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewportService);
  });

  afterEach(() => {
    document.body.style.width = '';
  });

  function setPageWidth(width: number): void {
    document.body.style.width = `${width}px`;
  }

  describe('isMobileView', () => {
    it('should be true when the page is exactly the mobile width', () => {
      // Arrange
      setPageWidth(700);

      // Act
      const isMobileView = service.isMobileView();

      // Assert
      expect(isMobileView).toBeTrue();
    });

    it('should be true when the page is narrower than the mobile width', () => {
      // Arrange
      setPageWidth(Random.Number({ min: 1, max: 700 }));

      // Act
      const isMobileView = service.isMobileView();

      // Assert
      expect(isMobileView).toBeTrue();
    });

    it('should be false when the page is wider than the mobile width', () => {
      // Arrange
      setPageWidth(Random.Number({ min: 701, max: 2000 }));

      // Act
      const isMobileView = service.isMobileView();

      // Assert
      expect(isMobileView).toBeFalse();
    });
  });
});
