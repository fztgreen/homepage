import { Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { DetailsComponent } from './details/details.component';
import { GameComponent } from './game/game.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PhotographyComponent } from './photography/photography.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home/(details:details)', pathMatch: 'full' },
  {
    path: 'home',
    component: NavigationComponent,
    children: [
      { path: 'details', component: DetailsComponent, outlet: 'details'},
      { path: 'contact', component: ContactComponent, outlet: 'contact' },
      { path: 'blog', component: BlogComponent, outlet: 'blog' },
      {
        path: 'photography',
        component: PhotographyComponent,
        outlet: 'photography',
      },
    ],
    outlet: 'primary',
  },
  { path: 'game', component: GameComponent },
  { path: '**', component: NotFoundComponent },
];
