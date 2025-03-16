import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tokenSubject = new BehaviorSubject<string | null>(this.loadToken());

  constructor() {}

  private loadToken(): string | null {
    return typeof localStorage !== 'undefined' ? localStorage.getItem('authToken') : null;
  }

  getToken(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  setToken(newToken: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('authToken', newToken);
    }
    this.tokenSubject.next(newToken);
  }

  clearToken(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('authToken');
    }
    this.tokenSubject.next(null);
  }
}
