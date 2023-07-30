import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BoardsService } from 'src/app/boards/services/boards.service';
import { CreateNewTask, NewTaskData, Task } from 'src/app/models/models';
import { ModalService } from 'src/app/services/modal.service';
import { SharedService } from 'src/app/shared/shared.service';
import { TaskService } from 'src/app/boards/services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit, OnDestroy {
  formData!: FormGroup;
  newTaskData!: NewTaskData;
  taskData!: Task;
  taskDataLength: number = 0;
  newCreateTaskData!: Task;
  private newTaskSubscription: Subscription | undefined;

  constructor(
    private taskService: TaskService,
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
      description: new FormControl<string>('', [Validators.required]),
    });

    this.newTaskSubscription = this.sharedService.newTask$.subscribe(
      (newTaskData) => {
        this.newTaskData = newTaskData;
        console.log(newTaskData);
        this.taskService
          .getTasksInColumn(newTaskData.board._id!, this.newTaskData.columnId)
          .subscribe(
            (taskData) => {
              this.taskDataLength = taskData.length;
              console.log(taskData.length);
            },
            (error) => {
              console.log('Ошибка получения данных о колонках:', error);
            }
          );
      }
    );
  }

  onSubmit() {
    console.log('Работает');
    if (
      this.newTaskData.board &&
      this.newTaskData.columnId &&
      this.formData.valid
    ) {
      const newTask: CreateNewTask = {
        title: this.formData.value.title,
        order: this.taskDataLength,
        description: this.formData.value.description,
        userId: this.newTaskData.board.owner,
        users: this.newTaskData.board.users,
      };

      console.log(newTask);

      this.taskService
        .createTask(
          this.newTaskData.board._id!,
          this.newTaskData.columnId,
          newTask
        )
        .subscribe(
          (newCreateTaskData) => {
            console.log(newCreateTaskData);
            this.newCreateTaskData = newCreateTaskData;
            this.sharedService.emitNewCreateTask(this.newCreateTaskData);
          },
          (error) => {
            console.log('Ошибка создания новой задачи:', error);
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
    if (this.newTaskSubscription) {
      this.newTaskSubscription.unsubscribe();
    }
  }
}
