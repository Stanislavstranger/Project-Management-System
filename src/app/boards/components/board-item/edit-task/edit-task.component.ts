import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TaskService } from 'src/app/boards/services/task.service';
import { ModalService } from 'src/app/services/modal.service';
import { SharedService } from 'src/app/shared/shared.service';
import { EditTask, Task } from 'src/app/models/models';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit, OnDestroy {
  formData!: FormGroup;
  private editTaskSubscription: Subscription | undefined;
  editTaskData!: Task;
  editTaskDataLength: number = 0;

  constructor(
    private taskService: TaskService,
    private modalService: ModalService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.formData = new FormGroup({
      title: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl<string>('', [Validators.required]),
    });

    this.editTaskSubscription = this.sharedService.editTask$.subscribe(
      (editTaskData) => {
        this.editTaskData = editTaskData;
        this.taskService
          .getTasksInColumn(editTaskData.boardId, this.editTaskData.columnId)
          .subscribe(
            (taskData) => {
              this.editTaskDataLength = taskData.length;
            },
            (error) => {
              console.log('Ошибка получения данных о колонках:', error);
            }
          );
      }
    );
  }

  onSubmit() {
    if (
      this.editTaskData.boardId &&
      this.editTaskData.columnId &&
      this.formData.valid
    ) {
      const editTask: EditTask = {
        title: this.formData.value.title,
        order: this.editTaskDataLength,
        description: this.formData.value.description,
        columnId: this.editTaskData.columnId,
        userId: this.editTaskData.userId,
        users: this.editTaskData.users,
      };

      this.taskService
        .putTaskById(
          this.editTaskData.boardId,
          this.editTaskData.columnId,
          this.editTaskData._id,
          editTask
        )
        .subscribe(
          (editTaskData) => {
            this.editTaskData = editTaskData;
            this.sharedService.emitNewCreateTask(this.editTaskData);
            this.sharedService.emitDeleteTask(this.editTaskData);
          },
          (error) => {
            console.log('Ошибка редактирования задачи:', error);
            console.log(this.editTaskData.boardId,
              this.editTaskData.columnId,
              this.editTaskData._id,
              editTask);
          }
        );

      this.formData.reset();
    } else {
      console.log('Ошибка данных');
    }
    this.modalService.close();
  }

  onCancel() {
    this.modalService.close();
  }

  ngOnDestroy() {
    if (this.editTaskSubscription) {
      this.editTaskSubscription.unsubscribe();
    }
  }
}
