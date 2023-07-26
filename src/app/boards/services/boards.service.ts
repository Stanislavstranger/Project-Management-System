import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, tap, map, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error.service';
import { Board } from 'src/app/models/models';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  private apiUrl = 'http://localhost:3000';

  private tokenKey: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private errorService: ErrorService,
    private authService: AuthService
  ) {}

  createBoard(boardsData: Board): Observable<any> {
    this.tokenKey = this.authService.getToken();
    console.log("🚀 ~ file: boards.service.ts:30 ~ BoardsService ~ createBoard ~ tokenKey:", this.tokenKey)
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.tokenKey}`,
    });
    const requestOptions = { headers: headers };

    return this.http
      .post<any>(`${this.apiUrl}/boards`, boardsData, requestOptions)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
