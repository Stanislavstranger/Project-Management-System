import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  /* private apiUrl = 'https://final-task-backend-production-4453.up.railway.app'; */

  private tokenKey: string | null = null;
  public username: string | null = null;
  public userId: string | null = null;

  constructor(private http: HttpClient) {}

  signUp(formData: any) {
    return this.http.post<any>(`${this.apiUrl}/auth/signup`, formData);
  }

  signIn(formData: any) {
    return this.http.post<any>(`${this.apiUrl}/auth/signin`, formData);
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

  isLoggedIn() {
    return this.getToken() !== null;
  }

  authorize() {
    this.tokenKey = localStorage.getItem('token') as string;
    this.username = localStorage.getItem('token') as string;
  }

  getUserId() {
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.tokenKey}`,
    });
    const requestOptions = { headers: headers };

    return this.http
      .get<any[]>(`${this.apiUrl}/users`, requestOptions)
      .pipe(
        tap((res) => console.log('Ответ от сервера:', res)),
        map((res) => {
          let userId = null;
          res.forEach((item) => {
            if (item.login === this.username) {
              userId = item._id;
            }
          });
          return userId;
        })
      )
      .subscribe((userId) => {
        console.log('UserID:', userId);
        this.userId = userId;
      });
  }
}
