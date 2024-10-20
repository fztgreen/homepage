import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { interval, take } from 'rxjs';
import { GithubService } from '../github.service';
import { Project } from './models/project.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  _destroyRef: DestroyRef = inject(DestroyRef);
  readme!: string;
  mobileView: boolean = document.body.offsetWidth < 700;

  readonly projects: Project[] = [
    {
      link: 'https://github.com/fztgreen/homepage',
      title: 'Homepage',
      language: 'Angular',
      readmeUrl:
        'https://api.github.com/repos/fztgreen/homepage/contents/README.md'
    } satisfies Project,
    {
      link: 'https://github.com/fztgreen/GroupSeven',
      title: 'The Great Escape Game',
      language: 'c++',
      readmeUrl:
        'https://api.github.com/repos/fztgreen/GroupSeven/contents/README.md'
    } satisfies Project,
    {
      link: 'https://github.com/fztgreen/ascii',
      title: 'Ascii Art',
      language: 'golang',
      readmeUrl:
        'https://api.github.com/repos/fztgreen/ascii/contents/readme.md'
    } satisfies Project,
    {
      link: 'https://github.com/fztgreen/haskell-example',
      title: 'Haskell Example',
      language: 'haskell',
      readmeUrl:
        'https://api.github.com/repos/fztgreen/haskell-example/contents/README.md'
    } satisfies Project,
    {
      link: 'https://github.com/fztgreen/rust-tests-example',
      title: 'Rust Tests Example',
      language: 'rust',
      readmeUrl:
        'https://api.github.com/repos/fztgreen/rust-tests-example/contents/README.md'
    } satisfies Project,
    {
      link: 'https://github.com/fztgreen/KafkaExample',
      title: 'Kafka Example',
      language: 'C#',
      readmeUrl:
        'https://api.github.com/repos/fztgreen/KafkaExample/contents/README.md'
    } satisfies Project,
    {
      link: 'https://github.com/fztgreen/chat-room',
      title: 'Chat Room',
      language: 'Angular',
      readmeUrl:
        'https://api.github.com/repos/fztgreen/chat-room/contents/README.md'
    } satisfies Project,
    {
      link: 'https://github.com/fztgreen/signal-r',
      title: 'SignalR Example',
      language: 'C#',
      readmeUrl:
        'https://api.github.com/repos/fztgreen/signal-r/contents/README.md'
    } satisfies Project,
    {
      link: 'https://github.com/fztgreen/pong',
      title: 'Pong',
      language: 'c++',
      readmeUrl: 'https://api.github.com/repos/fztgreen/pong/contents/README.md'
    } satisfies Project
  ];
  currentProject: Project = this.projects[0];
  loadingReadme: boolean = true;

  constructor(private _github: GithubService) {}

  ngOnInit(): void {
    this._github
      .getReadMe(this.projects[0].readmeUrl)
      .pipe(take(1))
      .subscribe((r) => {
        this.readme = r;
        this.loadingReadme = false;
      });

    interval(500).pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
      this.mobileView = document.body.offsetWidth <= 700;
    })
  }

  selectProject(project: Project): void {
    this.loadingReadme = true;
    this.currentProject = project;
    this._github
      .getReadMe(project.readmeUrl)
      .pipe(take(1))
      .subscribe((r) => {
        this.readme = r;
        this.loadingReadme = false;
      });
  }
}
