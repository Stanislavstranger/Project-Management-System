import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreRoutingModule } from './core/core-routing.module';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { AuthGuard } from './guards/auth.guard';
import { BoardsListComponent } from './boards/components/boards-list/boards-list.component';

const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  {
    path: '',

    loadChildren: () => import('./core/core.module').then((m) => m.CoreModule),
  },
  {
    path: 'signin',
    loadChildren: () => import('./core/core.module').then((m) => m.CoreModule),
  },
  {
    path: 'signup',
    loadChildren: () => import('./core/core.module').then((m) => m.CoreModule),
  },
  {
    path: 'boards-list',
    canActivate: [AuthGuard],
    component: BoardsListComponent,
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CoreRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
