import { Component, OnInit } from '@angular/core';
import { Board } from 'src/app/models/models';
import { BoardsService } from '../../services/boards.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss'],
})
export class BoardsListComponent implements OnInit {
  boards: Board[] = [];
  term = '';

  constructor(
    private boardService: BoardsService,
    private authService: AuthService,
    private router: Router,
    public modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.boardService.getBoardsAll().subscribe(
      (boardsData) => {
        boardsData.forEach((boardData: any) => {
          const board: Board = {
            _id: boardData._id,
            title: boardData.title,
            owner: '',
            users: [],
          };

          this.authService.getUserById(boardData.owner).subscribe(
            (ownerData) => {
              board.owner = ownerData.login || '';
            },
            (error) => {
              console.error(
                'Ошибка получения данных о владельце доски:',
                error
              );
            }
          );

          boardData.users.forEach((userId: string) => {
            this.authService.getUserById(userId).subscribe(
              (userData) => {
                board.users.push(userData.login || '');
              },
              (error) => {
                console.error('Ошибка получения данных о пользователе:', error);
              }
            );
          });

          this.boards.push(board);
        });

      },
      (error) => {
        console.error('Ошибка получения досок:', error);
      }
    );
  }

  onDrop(event: CdkDragDrop<Board[]>): void {
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
  }

  deleteBoard(boardId: string | undefined) {
    if (!boardId) {
      console.error('Invalid boardId:', boardId);
      return;
    }

    const confirmation = window.confirm(
      'Are you sure you want to delete this board?'
    );

    if (confirmation) {
      this.boardService.deleteBoard(boardId).subscribe(
        (response) => {
          this.router.navigate(['boards-list']);

          const index = this.boards.findIndex((board) => board._id === boardId);
          if (index !== -1) {
            this.boards.splice(index, 1);
          }

        },
        (error) => {
          console.error('Ошибка удаления доски:', error);
        }
      );
    }
  }

  editBoard(board: Board) {
    if (!board) {
      console.error('Недопустимый идентификатор доски:', board);
      return;
    }

    this.router.navigate(['boards-list/tasks-list', board._id]);
    this.modalService.close();
  }
}
