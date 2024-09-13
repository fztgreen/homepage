import { Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { GameComponent } from './game/game.component';

export const routes: Routes = [
    {path: "", component: NavigationComponent},
    {path: "game", component: GameComponent}
];
