import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorService } from 'src/app/services/error.service';
import { CreateNewTask, Task } from 'src/app/models/models';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000';
  private tokenKey: string | null = null;

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private authService: AuthService
  ) {}

  getTasksInColumn(boardId: string, columnId: string): Observable<any> {
    this.tokenKey = this.authService.getToken();
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.tokenKey}`,
    });
    const requestOptions = { headers: headers };

    return this.http
      .get<any>(
        `${this.apiUrl}/boards/${boardId}/columns/${columnId}/tasks`,
        requestOptions
      )
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  createTask(
    boardId: string,
    columnId: string,
    taskData: CreateNewTask
  ): Observable<any> {
    this.tokenKey = this.authService.getToken();
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.tokenKey}`,
    });
    const requestOptions = { headers: headers };
    return this.http
      .post<any>(
        `${this.apiUrl}/boards/${boardId}/columns/${columnId}/tasks`,
        taskData,
        requestOptions
      )
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  getTaskById(
    boardId: string,
    columnId: string,
    taskId: string
  ): Observable<any> {
    this.tokenKey = this.authService.getToken();
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.tokenKey}`,
    });
    const requestOptions = { headers: headers };

    return this.http
      .get<any>(
        `${this.apiUrl}/boards/${boardId}/columns/${columnId}/tasks${taskId}`,
        requestOptions
      )
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  putTaskById(
    boardId: string,
    columnId: string,
    taskId: string,
    taskData: Task
  ): Observable<any> {
    this.tokenKey = this.authService.getToken();
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.tokenKey}`,
    });
    const requestOptions = { headers: headers };

    return this.http
      .put<any>(
        `${this.apiUrl}/boards/${boardId}/columns/${columnId}/tasks${taskId}`,
        taskData,
        requestOptions
      )
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  deleteTaskById(
    boardId: string,
    columnId: string,
    taskId: string
  ): Observable<any> {
    this.tokenKey = this.authService.getToken();
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.tokenKey}`,
    });
    const requestOptions = { headers: headers };

    return this.http
      .delete<any>(
        `${this.apiUrl}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        requestOptions
      )
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
