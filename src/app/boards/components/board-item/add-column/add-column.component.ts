import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  boardId?: string | null = '';
  board?: string | null = '';
  column?: Column;
  columnData?: Column | null;
  private paramMapSubscription: Subscription | undefined;

  constructor(
    private columnService: ColumnService,
    private route: ActivatedRoute,
    private router: Router,
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
          (board: any) => {
            board._id;

            this.columnService.getColumnsAllById(board._id).subscribe(
              (columnData) => {
                this.column = {
                  title: this.formData.value.title,
                  order: columnData.length,
                };
                console.log(this.column);
              },
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
    if (this.column) {
      this.column.title = this.formData.value.title;

      if (this.boardId) {
        this.columnService.createColumn(this.boardId, this.column).subscribe(
          (response) => {
            console.log('Колонка создана:', response);
            this.modalService.close();

            this.router.navigate([`../${this.boardId}`], {
              relativeTo: this.route,
            });
          },
          (error) => {
            console.error('Ошибка при создании колонки:', error);
          }
        );
      } else {
        console.error('Ошибка: Не удалось получить идентификатор доски.');
      }
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
