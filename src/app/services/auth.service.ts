import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { AuthResponse, LoginResponse, User } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  public currentUser = signal<User | null>(null);

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/user/login', {
      email,
      password,
    }).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        this.currentUser.set(res.user);
      })
    );
  }

  register(data: { email: string; password: string }) {
    return this.http.post<AuthResponse>('/user', data);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUser.set(null);
  }

  isLoggedIn(): boolean {
    return !!this.getToken() && !!this.currentUser();
  }
}