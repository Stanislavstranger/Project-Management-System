import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BoardsListComponent } from './components/boards-list/boards-list.component';
import { AddBoardComponent } from './components/add-board/add-board.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [BoardsListComponent, AddBoardComponent],
  exports: [BoardsListComponent, AddBoardComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class BoardsModule {}
