import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NewColumnData, NewTaskData, Task } from '../models/models';

@Injectable()
export class SharedService {
  private newColumnSubject = new Subject<NewColumnData>();
  newColumn$ = this.newColumnSubject.asObservable();

  private newTaskSubject = new Subject<NewTaskData>();
  newTask$ = this.newTaskSubject.asObservable();

  private newCreateTaskSubject = new Subject<Task>();
  newCreateTask$ = this.newCreateTaskSubject.asObservable();

  private editTaskSubject = new Subject<Task>();
  editTask$ = this.editTaskSubject.asObservable();

  private deleteTaskSubject = new Subject<Task>();
  deleteTask$ = this.deleteTaskSubject.asObservable();

  emitNewColumn(newColumnData: NewColumnData) {
    this.newColumnSubject.next(newColumnData);
  }

  emitNewTask(newTaskData: NewTaskData) {
    this.newTaskSubject.next(newTaskData);
  }

  emitNewCreateTask(newCreateTaskData: Task) {
    this.newCreateTaskSubject.next(newCreateTaskData);
  }

  emitEditTask(editTaskData: Task) {
    this.editTaskSubject.next(editTaskData);
  }

  emitDeleteTask(deleteTaskData: Task) {
    this.deleteTaskSubject.next(deleteTaskData);
  }
}
