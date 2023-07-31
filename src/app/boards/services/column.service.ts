import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error.service';
import { Column } from 'src/app/models/models';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ColumnService {
  /* private apiUrl = 'http://localhost:3000'; */
  private apiUrl = 'https://final-task-backend-production-4453.up.railway.app';
  private tokenKey: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private errorService: ErrorService,
    private authService: AuthService
  ) {}

  getColumnsAllById(boardId: string): Observable<any> {
    this.tokenKey = this.authService.getToken();
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.tokenKey}`,
    });
    const requestOptions = { headers: headers };

    return this.http
      .get<any>(`${this.apiUrl}/boards/${boardId}/columns`, requestOptions)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  getColumnById(boardId: string, columnId: string): Observable<any> {
    this.tokenKey = this.authService.getToken();
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.tokenKey}`,
    });
    const requestOptions = { headers: headers };

    return this.http
      .get<any>(`${this.apiUrl}/boards/${boardId}/columns/${columnId}`, requestOptions)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  createColumn(boardId: string, column: Column): Observable<any> {
    this.tokenKey = this.authService.getToken();
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.tokenKey}`,
    });
    const requestOptions = { headers: headers };

    return this.http
      .post<any>(
        `${this.apiUrl}/boards/${boardId}/columns`,
        column,
        requestOptions
      )
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  putColumnById(
    boardId: string,
    columnId: string,
    column: Column
  ): Observable<any> {
    this.tokenKey = this.authService.getToken();
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.tokenKey}`,
    });
    const requestOptions = { headers: headers };

    return this.http
      .put<any>(
        `${this.apiUrl}/boards/${boardId}/columns/${columnId}`,
        column,
        requestOptions
      )
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  deleteColumnById(boardId: string, columnId: string): Observable<any> {
    this.tokenKey = this.authService.getToken();
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.tokenKey}`,
    });
    const requestOptions = { headers: headers };

    return this.http
      .delete<any>(
        `${this.apiUrl}/boards/${boardId}/columns/${columnId}`,
        requestOptions
      )
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
