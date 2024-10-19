import { Routes, UrlMatchResult, UrlSegment } from '@angular/router';
import { DownloadComponent } from './download/download.component';
import { GameComponent } from './game/game.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { StoreServiceComponent } from './store-service/store-service.component';
import { StoreComponent } from './store/store.component';
import { StoreRequestComponent } from './store-request/store-request.component';
import { ResumeComponent } from './resume/resume.component';
import { ProjectsComponent } from './projects/projects.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    matcher: (url) => AllCaseMatcher(url, 'details'),
    redirectTo: '/home#details',
    pathMatch: 'full'
  },
  {
    matcher: (url) => AllCaseMatcher(url, 'contact'),
    redirectTo: '/home#contact',
    pathMatch: 'full'
  },
  {
    matcher: (url) => AllCaseMatcher(url, 'photography'),
    redirectTo: '/home#photography',
    pathMatch: 'full'
  },
  {
    matcher: (url) => AllCaseMatcher(url, 'blog'),
    redirectTo: '/home#blog',
    pathMatch: 'full'
  },
  {
    matcher: (url) => AllCaseMatcher(url, 'home'),
    component: NavigationComponent
  },
  { matcher: (url) => AllCaseMatcher(url, 'game'), component: GameComponent },
  {
    matcher: (url) => AllCaseMatcher(url, 'downloads'),
    component: DownloadComponent
  },
  {
    matcher: (url) => AllCaseMatcher(url, 'store'),
    component: StoreComponent,
    children: [
      {
        path: 'requests',
        component: StoreRequestComponent
      },
      {
        path: ':service',
        component: StoreServiceComponent
      }
    ]
  },
  {
    matcher: (url) => AllCaseMatcher(url, 'resume'),
    component: ResumeComponent
  },
  {
    matcher: (url) => AllCaseMatcher(url, 'projects'),
    component: ProjectsComponent
  },
  { path: '**', component: NotFoundComponent }
];

function AllCaseMatcher(
  urlsegments: UrlSegment[],
  endpoint: string
): UrlMatchResult | null {
  if (urlsegments[0].path.toLocaleLowerCase() == endpoint) {
    return { consumed: [urlsegments[0]] };
  }

  return null;
}
