import { Component, OnInit } from '@angular/core';
import { GithubService } from '../github.service';
import { Project } from './models/project.model';
import { take } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  readme!: string;

  readonly projects: Project[] = [
    {
      link: 'https://github.com/fztgreen/homepage',
      title: 'Homepage',
      language: 'Angular',
      readmeUrl: "https://api.github.com/repos/fztgreen/homepage/contents/README.md"
    } satisfies Project,
    {
      link: 'https://github.com/fztgreen/GroupSeven',
      title: 'The Great Escape Game',
      language: 'c++',
      readmeUrl: "https://api.github.com/repos/fztgreen/GroupSeven/contents/README.md"
    } satisfies Project,
    {
      link: 'https://github.com/fztgreen/ascii',
      title: 'Ascii Art',
      language: 'golang',
      readmeUrl: "https://api.github.com/repos/fztgreen/ascii/contents/README.md"
    } satisfies Project,
    {
      link: 'https://github.com/fztgreen/haskell-example',
      title: 'Haskell Example',
      language: 'haskell',
      readmeUrl: "https://api.github.com/repos/fztgreen/haskell-example/contents/README.md"
    } satisfies Project,
    {
      link: 'https://github.com/fztgreen/rust-tests-example',
      title: 'Rust Tests Example',
      language: 'rust',
      readmeUrl: "https://api.github.com/repos/fztgreen/rust-tests-example/contents/README.md"
    } satisfies Project,
    {
      link: 'https://github.com/fztgreen/KafkaExample',
      title: 'Kafka Example',
      language: 'C#',
      readmeUrl: "https://api.github.com/repos/fztgreen/KafkaExample/contents/README.md"
    } satisfies Project,
    {
      link: 'https://github.com/fztgreen/chat-room',
      title: 'Chat Room',
      language: 'Angular',
      readmeUrl: "https://api.github.com/repos/fztgreen/chat-room/contents/README.md"
    } satisfies Project,
    {
      link: 'https://github.com/fztgreen/signal-r',
      title: 'SignalR Example',
      language: 'C#',
      readmeUrl: "https://api.github.com/repos/fztgreen/signal-r/contents/README.md"
    } satisfies Project,
    {
      link: 'https://github.com/fztgreen/pong',
      title: 'Pong',
      language: 'c++',
      readmeUrl: "https://api.github.com/repos/fztgreen/pong/contents/README.md"
    } satisfies Project
  ];

  constructor(private _github: GithubService) {}

  ngOnInit(): void {
    this._github.getReadMe(this.projects[0].readmeUrl).pipe(take(1)).subscribe((r) => (this.readme = r));
  }

  getReadMe(readmeUrl: string): void {
    this._github.getReadMe(readmeUrl).pipe(take(1)).subscribe((r) => (this.readme = r));
  }
}
