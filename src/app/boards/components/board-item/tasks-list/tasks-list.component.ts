import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { BoardsService } from 'src/app/boards/services/boards.service';
import { Board, Column } from 'src/app/models/models';
import { forkJoin, Subscription } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { ColumnService } from 'src/app/boards/services/column.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent implements OnInit {
  board?: Board;
  boardId: string | null = '';
  columnData?: Column;
  length: number = 0;
  columns: Column[] = [];
  private paramMapSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private boardsService: BoardsService,
    private authService: AuthService,
    public modalService: ModalService,
    private columnService: ColumnService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const boardId = params.get('boardId');

      if (boardId) {
        this.boardsService.getBoardById(boardId).subscribe(
          (boardData: any) => {
            const board: Board = {
              _id: boardData._id,
              title: boardData.title,
              owner: '',
              users: [],
            };

            const ownerData$ = this.authService.getUserById(boardData.owner);
            const usersData$ = boardData.users.map((userId: string) =>
              this.authService.getUserById(userId)
            );

            forkJoin([ownerData$, ...usersData$]).subscribe(
              (dataArr: any[]) => {
                board.owner = dataArr[0].login || '';
                dataArr.slice(1).forEach((userData: any) => {
                  board.users.push(userData.login || '');
                });

                this.board = board;
              },
              (error) => {
                console.error('Ошибка получения данных о пользователе:', error);
              }
            );
          },
          (error) => {
            console.error('Ошибка получения данных о доске:', error);
          }
        );

        this.columnService.getColumnsAllById(boardId).subscribe(
          (columnData) => {
            columnData.forEach((columnData: any) => {
              const column: Column = {
                title: columnData.title,
                order: columnData.order,
              };

              this.columns.push(column);
            });
            console.log('Из общего', columnData);
          },

          (error) => {
            console.log('Ошибка получения данных о колонках:', error);
          }
        );
      }
    });
  }

  onDrop(event: CdkDragDrop<Column[]>): void {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }
}
