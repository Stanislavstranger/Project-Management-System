import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { ErrorGuard } from '../guards/error.guard';
import { AddBoardComponent } from './components/add-board/add-board.component';
import { TasksListComponent } from './components/board-item/tasks-list/tasks-list.component';

const routes: Routes = [
  {
    path: 'boards-list/add-board',
    canActivate: [ErrorGuard, AuthGuard],
    component: AddBoardComponent,
  },
  {
    path: 'boards-list/tasks-list/:boardId',
    canActivate: [ErrorGuard, AuthGuard],
    component: TasksListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardRoutingModule {}
