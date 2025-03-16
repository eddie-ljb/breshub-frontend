import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private token = signal<string | null>(null);

  constructor() {
    // Token direkt aus localStorage oder sessionStorage setzen
    this.token.set(localStorage.getItem('authToken'));
  }

  getToken(): string | null {
    return this.token();
  }

  setToken(newToken: string) {
    this.token.set(newToken);
    localStorage.setItem('authToken', newToken);
  }
}

