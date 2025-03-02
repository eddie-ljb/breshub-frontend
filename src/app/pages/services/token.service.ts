import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = 'authToken';

  setToken(token: string) {
    if (typeof window !== 'undefined') {  // Prüfen, ob wir im Browser sind
      sessionStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  getToken(): string {
    if (typeof window !== 'undefined') {  // Prüfen, ob wir im Browser sind
      if (sessionStorage.getItem(this.TOKEN_KEY) != null) {
        return sessionStorage.getItem(this.TOKEN_KEY) + "";
      }
    }
    return "";
  }

  clearToken() {
    if (typeof window !== 'undefined') {  // Prüfen, ob wir im Browser sind
      sessionStorage.removeItem(this.TOKEN_KEY);
    }
  }
}
