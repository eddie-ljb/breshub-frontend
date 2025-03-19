import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../services/token.service';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule, PasswordModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  email : string = '';
  token: string = '';
  message: string = ''; // Hier wird die API-Antwort gespeichert
  loading: boolean = false; // Ladeanzeige
  error: string = ''; // Fehlernachricht
  Authorization : string = '';

  constructor(private http: HttpClient, private router: Router, private tokenService: TokenService) {}

  onSubmit() {
    this.loading = true;
    this.message = '';
    this.error = '';

    const loginData = {
      username: this.username,
      password: this.password
    };

    this.http.get<any>('https://breshub-engine.etiennebader.de/auth/login?username='+this.username+'&password='+this.password)
      .subscribe({
        next: (response) => {
          //this.message = JSON.stringify(response, null, 5);
          this.token = response.access_token;
          this.loading = false;
          this.tokenService.setToken(response.access_token);

          const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.token}`,
          });
          this.tokenService.setToken(this.token);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.error = 'Login fehlgeschlagen. Bitte überprüfe deine Eingaben.';
          console.error('Fehler:', err);
          this.loading = false;
        }
      });
  }
}
