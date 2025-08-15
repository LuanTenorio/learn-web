import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../config/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly path = "/auth/login"
  private tokenKey = 'bearer_token';
  private isAuthenticatedSignal = signal(false);

  constructor(private readonly http: HttpClient) {
    this.isAuthenticatedSignal.set(!!this.getToken());
  }

  login(data: { email: string, password: string }) {
    return this.http.post<{ access_token: string }>(`${environment.apiUrl}${this.path}`, data)
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
    this.isAuthenticatedSignal.set(true);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticatedSignal.set(false);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSignal();
  }

}
