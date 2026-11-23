import { Routes, UrlMatchResult, UrlSegment } from '@angular/router';
import { DownloadComponent } from './download/download.component';
import { GameComponent } from './game/game.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProjectsComponent } from './projects/projects.component';
import { ResumeComponent } from './resume/resume.component';
import { StoreRequestComponent } from './store-request/store-request.component';
import { StoreServiceComponent } from './store-service/store-service.component';
import { StoreComponent } from './store/store.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    matcher: (url) => AllCaseWholeUrlMatcher(url, 'details'),
    redirectTo: '/home#details'
  },
  {
    matcher: (url) => AllCaseWholeUrlMatcher(url, 'contact'),
    redirectTo: '/home#contact'
  },
  {
    matcher: (url) => AllCaseWholeUrlMatcher(url, 'photography'),
    redirectTo: '/home#photography'
  },
  {
    matcher: (url) => AllCaseWholeUrlMatcher(url, 'blog'),
    redirectTo: '/home#blog'
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
  if (urlsegments[0].path.toLocaleLowerCase() === endpoint) {
    return { consumed: [urlsegments[0]] };
  }

  return null;
}

// pathMatch does not apply to custom matchers, and an absolute redirect drops
// unconsumed segments, so a redirect route must reject them itself.
function AllCaseWholeUrlMatcher(
  urlsegments: UrlSegment[],
  endpoint: string
): UrlMatchResult | null {
  if (urlsegments.length !== 1) {
    return null;
  }

  return AllCaseMatcher(urlsegments, endpoint);
}
