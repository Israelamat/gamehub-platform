import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginResponse, User } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private currentUserSubject = new BehaviorSubject<User | null>(null); public currentUser = this.currentUserSubject.asObservable();
  public currentUser$ = this.currentUserSubject.asObservable();

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/user/login', {
      email,
      password,
    }).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        console.log(res);
      })
    );
  }

  loadCurrentUser() {
    const user = localStorage.getItem('user_data');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  register(data: { email: string; password: string }): Observable<any> {
    return this.http.post('/user', data);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user_data');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}