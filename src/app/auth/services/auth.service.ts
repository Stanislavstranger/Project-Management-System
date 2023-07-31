import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error.service';
import { EditUserData, User } from 'src/app/models/models';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /* private apiUrl = 'http://localhost:3000'; */
  private apiUrl = 'https://final-task-backend-production-4453.up.railway.app';

  private tokenKey: string | null = null;
  public username: string | null = null;
  public userId: string | null = null;
  jwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private router: Router,
    private errorService: ErrorService
  ) {}

  signUp(formData: User): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/auth/signup`, formData)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  signIn(formData: User): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/auth/signin`, formData)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  saveToken(login: string, token: string) {
    localStorage.setItem('login', login);
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('login');
    localStorage.removeItem('token');
  }

  getLogin() {
    return localStorage.getItem('login');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  authorize() {
    if (!this.jwtHelperService.isTokenExpired(localStorage.getItem('token'))) {
      this.tokenKey = localStorage.getItem('token') as string;
      this.username = localStorage.getItem('token') as string;
    } else {
      localStorage.removeItem('login');
      localStorage.removeItem('token');
    }
  }

  getUserAll(): Observable<any> {
    this.authorize();
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.tokenKey}`,
    });

    const requestOptions = { headers: headers };

    return this.http
      .get<any>(`${this.apiUrl}/users`, requestOptions)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  getUserById(id: string): Observable<any> {
    this.authorize();
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.tokenKey}`,
    });

    const requestOptions = { headers: headers };

    return this.http
      .get<any>(`${this.apiUrl}/users/${id}`, requestOptions)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  putUserById(uderId: string, userData: EditUserData): Observable<any> {
    this.authorize();
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.tokenKey}`,
    });

    const requestOptions = { headers: headers };

    return this.http
      .put<any>(`${this.apiUrl}/users/${uderId}`, userData, requestOptions)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  deleteUserById(uderId: string): Observable<any> {
    this.authorize();
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.tokenKey}`,
    });

    const requestOptions = { headers: headers };

    return this.http
      .delete<any>(`${this.apiUrl}/users/${uderId}`, requestOptions)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  logOut() {
    this.router.navigate(['']);
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
