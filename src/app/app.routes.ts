import { Routes, UrlMatchResult, UrlSegment } from '@angular/router';
import { GameComponent } from './game/game.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    matcher: (url) => AllCaseMatcher(url, 'details'),
    redirectTo: '/home#details',
    pathMatch: 'full',
  },
  {
    matcher: (url) => AllCaseMatcher(url, 'contact'),
    redirectTo: '/home#contact',
    pathMatch: 'full',
  },
  {
    matcher: (url) => AllCaseMatcher(url, 'photography'),
    redirectTo: '/home#photography',
    pathMatch: 'full',
  },
  {
    matcher: (url) => AllCaseMatcher(url, 'blog'),
    redirectTo: '/home#blog',
    pathMatch: 'full',
  },
  { matcher: (url) => AllCaseMatcher(url, 'home'), component: NavigationComponent },
  { matcher: (url) => AllCaseMatcher(url, 'game'), component: GameComponent },
  { path: '**', component: NotFoundComponent },
];

function AllCaseMatcher(
  urlsegments: UrlSegment[],
  endpoint: string,
): UrlMatchResult | null {
  if (urlsegments[0].path.toLocaleLowerCase() == endpoint) {
    return { consumed: urlsegments };
  }

  return null;
}