import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { BoardsService } from 'src/app/boards/services/boards.service';
import {
  Board,
  Column,
  NewColumnData,
  NewTaskData,
  Task,
} from 'src/app/models/models';
import { forkJoin, Subscription } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { ColumnService } from 'src/app/boards/services/column.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { SharedService } from 'src/app/shared/shared.service';
import { TaskService } from 'src/app/boards/services/task.service';

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
  column!: Column;
  columns: Column[] = [];
  private newColumnSubscription: Subscription | undefined;
  private newCreateTaskSubscription: Subscription | undefined;
  isAddColumn: Boolean = false;
  isAddTask: Boolean = false;
  isEditTask: Boolean = false;
  task!: Task;
  tasks: Task[] = [];
  tasksByColumn: { [columnId: string]: Task[] } = {};
  confirmation: Boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private boardsService: BoardsService,
    private authService: AuthService,
    public modalService: ModalService,
    private columnService: ColumnService,
    private sharedService: SharedService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const boardId = params.get('boardId');

      if (boardId) {
        this.getBoardData(boardId);
        this.getColumnData(boardId);

        this.newColumnSubscription = this.sharedService.newColumn$.subscribe(
          (newColumnData: NewColumnData) => {
            this.columnService
              .getColumnById(boardId, newColumnData.id)
              .subscribe(
                (columnData) => {
                  this.column = {
                    title: columnData.title,
                    order: columnData.order,
                    _id: columnData._id,
                  };
                  this.columns.push(this.column);
                },

                (error) => {
                  console.log('Ошибка получения данных о колонках:', error);
                }
              );
          }
        );

        this.sharedService.newCreateTask$.subscribe((newTaskData: Task) => {
          if (newTaskData && newTaskData.columnId) {
            if (!this.tasksByColumn[newTaskData.columnId]) {
              this.tasksByColumn[newTaskData.columnId] = [];
            }
            this.tasksByColumn[newTaskData.columnId].push(newTaskData);
          }
        });
      }
    });
  }

  getBoardData(boardId: string): void {
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
  }

  getColumnData(boardId: string): void {
    this.columnService.getColumnsAllById(boardId).subscribe(
      (columnData) => {
        this.columns = [];
        columnData.forEach((columnData: any) => {
          const column: Column = {
            title: columnData.title,
            order: columnData.order,
            _id: columnData._id,
          };

          this.taskService.getTasksInColumn(boardId, columnData._id).subscribe(
            (taskData) => {
              this.tasksByColumn[column._id!] = taskData;
            },
            (error) => {
              console.log('Ошибка получения данных о колонках:', error);
            }
          );

          this.columns.push(column);
        });
        console.log('Из общего', columnData);
      },

      (error) => {
        console.log('Ошибка получения данных о колонках:', error);
      }
    );
  }

  onDrop(event: CdkDragDrop<Column[]>): void {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  deleteColumnById(boardId: string, columnId: string, columnOrder: number) {
    if (!boardId || !columnId) {
      console.error('Invalid boardId:', boardId);
      console.error('Invalid columnId:', columnId);
      return;
    }

    const confirmation = window.confirm(
      'Are you sure you want to delete this column?'
    );

    if (confirmation) {
      this.columnService.deleteColumnById(boardId, columnId).subscribe(
        (response) => {
          this.router.navigate([`boards-list/tasks-list/${boardId}`]);

          const index = this.columns.findIndex(
            (column) => column.order === columnOrder
          );
          console.log(index);
          if (index !== -1) {
            this.columns.splice(index, 1);
          }
        },
        (error) => {
          console.error('Ошибка удаления доски:', error);
        }
      );
    }
  }

  ngOnDestroy() {
    if (this.newColumnSubscription) {
      this.newColumnSubscription.unsubscribe();
    }
  }

  addColumn() {
    this.isAddTask = false;
    this.isEditTask = false;
    this.isAddColumn = true;
    this.modalService.open();
  }

  addTask(board: Board, columnId: string) {
    this.isAddColumn = false;
    this.isEditTask = false;
    this.isAddTask = true;
    this.modalService.open();

    const newTaskData: NewTaskData = {
      board: board,
      columnId: columnId,
    };

    setTimeout(() => {
      this.sharedService.emitNewTask(newTaskData);
    }, 1000);
  }

  deleteTask(boardId: string, columnId: string, taskId: string): void {
    this.confirmation = window.confirm(
      'Are you sure you want to delete this task?'
    );

    if (this.confirmation) {
      this.taskService.deleteTaskById(boardId, columnId, taskId).subscribe(
        (response) => {
          const columnIndex = this.columns.findIndex(
            (column) => column._id === columnId
          );
          if (columnIndex !== -1) {
            const taskIndex = this.tasksByColumn[columnId].findIndex(
              (task) => task._id === taskId
            );
            if (taskIndex !== -1) {
              this.tasksByColumn[columnId].splice(taskIndex, 1);
            }
          }
          this.confirmation = false;
        },
        (error) => {
          console.error('Ошибка удаления задачи:', error);
          console.log(boardId, columnId, taskId);
        }
      );
    }
  }

  putTaskById() {
    this.isAddColumn = false;
    this.isAddTask = false;
    this.isEditTask = true;
    if (!this.confirmation) {
      this.modalService.open();
      this.confirmation = false;
    }
  }
}
