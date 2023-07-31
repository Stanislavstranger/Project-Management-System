import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ColumnService } from 'src/app/boards/services/column.service';
import { BoardsService } from 'src/app/boards/services/boards.service';
import { Column, NewColumnData } from 'src/app/models/models';
import { ModalService } from 'src/app/services/modal.service';
import { SharedService } from 'src/app/shared/shared.service';

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
  columns: Column[] = [];
  columnData?: Column | null;
  private paramMapSubscription: Subscription | undefined;

  constructor(
    private columnService: ColumnService,
    private route: ActivatedRoute,
    private router: Router,
    private boardsService: BoardsService,
    private modalService: ModalService,
    private sharedService: SharedService
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
            this.board = board.title;

            this.columnService.getColumnsAllById(this.boardId!).subscribe(
              (columnData) => {
                this.columns = columnData;
              },
              (error) => {
                console.log('Ошибка получения данных о колонках:', error);
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
    if (this.boardId && this.formData.valid) {
      const newColumn: Column = {
        title: this.formData.value.title,
        order: this.columns.length,
      };

      this.columnService.createColumn(this.boardId, newColumn).subscribe(
        (createdColumn) => {
          this.modalService.close();

          const newColumnData: NewColumnData = {
            id: createdColumn._id,
          };

          this.sharedService.emitNewColumn(newColumnData);

          this.formData.reset();
        },
        (error) => {
          console.error('Ошибка при создании колонки:', error);
        }
      );
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
