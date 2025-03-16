import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
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


    const registerData = {
      username: this.username,
      password: this.password,
      email: this.email,
    };

    this.http.post<any>('https://breshub-engine.etiennebader.de/auth/register', registerData)
      .subscribe({
        next: (response) => {
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Registrierung fehlgeschlagen. Bitte überprüfe deine Eingaben.';
          console.error('Fehler:', err);
          this.loading = false;
        }
      });

      this.router.navigate(['/login']);
  }
}
