import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { ColumnService } from 'src/app/boards/services/column.service';
import { BoardsService } from 'src/app/boards/services/boards.service';
import { Column } from 'src/app/models/models';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-add-column',
  templateUrl: './add-column.component.html',
  styleUrls: ['./add-column.component.scss'],
})
export class AddColumnComponent implements OnInit, OnDestroy {
  formData!: FormGroup;
  boardId: string | null = '';
  columnData?: Column;
  length: number = 0;
  column?: Column;
  private paramMapSubscription: Subscription | undefined;

  constructor(
    private columnService: ColumnService,
    private route: ActivatedRoute,
    private boardsService: BoardsService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.formData = new FormGroup({
      title: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    this.paramMapSubscription = this.route.paramMap.subscribe((params) => {
      this.boardId = params.get('boardId');

      if (this.boardId) {
        this.boardsService.getBoardById(this.boardId).subscribe(
          (boardId: string) => {
            const board: string = boardId;

            this.columnService
              .getColumnsAllById(boardId)
              .pipe(toArray())
              .subscribe(
                (columnData: Column[]) => (this.length = columnData.length - 1),
                (error) => {
                  console.log('Ошибка получения данных о доске:', error);
                }
              );
          },
          (error) => {
            console.error('Ошибка получения данных о доске:', error);
          }
        );
      }
    });
  }

  onSubmit() {
    this.column = {
      title: this.formData.value.title,
      order: this.length,
    };

    if (this.boardId) {
      this.columnService.createColumn(this.boardId, this.column).subscribe(
        (response) => {
          console.log('Колонка создана:', response);
          this.modalService.close();
        },
        (error) => {
          console.error('Ошибка при создании колонки:', error);
        }
      );
    } else {
      console.error('Ошибка: Не удалось получить идентификатор доски.');
    }
  }

  onCancel() {
    this.modalService.close();
  }

  ngOnDestroy() {
    if (this.paramMapSubscription) {
      this.paramMapSubscription.unsubscribe();
    }
  }
}
