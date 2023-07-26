import { Component, OnInit } from '@angular/core';
import { Board } from 'src/app/models/models';
import { BoardsService } from '../../services/boards.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss'],
})
export class BoardsListComponent implements OnInit {
  boards: Board[] = [];
  term = '';

  constructor(private boardService: BoardsService, private authService: AuthService) {}

  ngOnInit(): void {
    this.boardService.getBoard().subscribe(
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
              console.error('Ошибка получения данных о владельце доски:', error);
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
        console.log(this.boards);
      },
      (error) => {
        console.error('Ошибка получения досок:', error);
      }
    );
  }

  onDrop(event: CdkDragDrop<Board[]>): void {
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
  }
}

