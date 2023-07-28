import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BoardsListComponent } from './components/boards-list/boards-list.component';
import { AddBoardComponent } from './components/add-board/add-board.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BoardRoutingModule } from './board-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BoardsService } from './services/boards.service';
import { AuthModule } from '../auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { FilterBoardsPipe } from '../pipes/filter-boards.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TasksListComponent } from './components/board-item/tasks-list/tasks-list.component';
import { AddColumnComponent } from './components/board-item/add-column/add-column.component';
import { ModalComponent } from '../modal/modal.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    BoardsListComponent,
    AddBoardComponent,
    FilterBoardsPipe,
    TasksListComponent,
    AddColumnComponent,
    ModalComponent
  ],
  exports: [BoardsListComponent, AddBoardComponent, AddColumnComponent, ModalComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    BoardRoutingModule,
    AuthModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatCardModule,
    MatListModule,
    DragDropModule,
    FlexLayoutModule,
  ],
  providers: [BoardsService],
})
export class BoardsModule {}
