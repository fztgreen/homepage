import { Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { DetailsComponent } from './details/details.component';
import { GameComponent } from './game/game.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PhotographyComponent } from './photography/photography.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home/details', pathMatch: 'full' },
  {
    path: 'home',
    component: NavigationComponent,
    children: [
      { path: 'details', component: DetailsComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'photography', component: PhotographyComponent },
    ],
    outlet: 'primary',
  },
  { path: 'game', component: GameComponent },
  { path: '**', component: NotFoundComponent },
];
