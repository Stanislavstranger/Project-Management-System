import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { ErrorGuard } from '../guards/error.guard';
import { AddBoardComponent } from './components/add-board/add-board.component';

const routes: Routes = [
  {
    path: 'boards-list/add-board',
    canActivate: [ErrorGuard, AuthGuard],
    component: AddBoardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardRoutingModule {}
