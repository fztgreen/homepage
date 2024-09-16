import { Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { GameComponent } from './game/game.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    { path: '',   redirectTo: '/home', pathMatch: 'full' },
    {path: "home", component: NavigationComponent},
    {path: "game", component: GameComponent},
    {path: "**", component: NotFoundComponent}
];
