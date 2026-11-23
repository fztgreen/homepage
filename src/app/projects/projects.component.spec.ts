import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { Random } from 'random-test-values';
import { ProjectsComponent } from './projects.component';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  function randomReadme(): string {
    return Random.String({
      whiteListString: 'abcdefghijklmnopqrstuvwxyz ',
      minLength: 1,
      maxLength: 50
    });
  }

  function respondWithReadme(url: string, readme: string): void {
    httpTestingController.expectOne(url).flush({ content: btoa(readme) });
  }

  it('should create', () => {
    // Arrange
    respondWithReadme(component.projects[0].readmeUrl, randomReadme());

    // Assert
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should show the first project README', () => {
      // Arrange
      const readme = randomReadme();

      // Act
      respondWithReadme(component.projects[0].readmeUrl, readme);

      // Assert
      expect(component.readme).toBe(readme);
      expect(component.loadingReadme).toBeFalse();
    });
  });

  describe('selectProject', () => {
    it('should show the selected project README', () => {
      // Arrange
      respondWithReadme(component.projects[0].readmeUrl, randomReadme());
      const project =
        component.projects[
          Random.Number({ min: 1, max: component.projects.length })
        ];
      const readme = randomReadme();

      // Act
      component.selectProject(project);
      respondWithReadme(project.readmeUrl, readme);

      // Assert
      expect(component.currentProject).toBe(project);
      expect(component.readme).toBe(readme);
      expect(component.loadingReadme).toBeFalse();
    });
  });
});
