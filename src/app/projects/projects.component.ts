import { Component } from '@angular/core';
import { Project } from './models/project';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  readonly projects: Project[] = [
    {
      link: "https://github.com/fztgreen/homepage",
      title: "Homepage",
      language: "Angular"
    } satisfies Project,
    {
      link: "https://github.com/fztgreen/GroupSeven",
      title: "The Great Escape Game",
      language: "c++"
    } satisfies Project,
    {
      link: "https://github.com/fztgreen/ascii",
      title: "Ascii Art",
      language: "golang"
    } satisfies Project,
    {
      link: "https://github.com/fztgreen/haskell-example",
      title: "Haskell Example",
      language: "haskell"
    } satisfies Project,
    {
      link: "https://github.com/fztgreen/rust-tests-example",
      title: "Rust Tests Example",
      language: "rust"
    } satisfies Project,
    {
      link: "https://github.com/fztgreen/KafkaExample",
      title: "Kafka Example",
      language: "C#"
    } satisfies Project,
    {
      link: "https://github.com/fztgreen/chat-room",
      title: "Chat Room",
      language: "Angular"
    } satisfies Project,
    {
      link: "https://github.com/fztgreen/signal-r",
      title: "SignalR Example",
      language: "C#"
    } satisfies Project,
    {
      link: "https://github.com/fztgreen/pong",
      title: "Pong",
      language: "c++"
    } satisfies Project,
  ];
}
