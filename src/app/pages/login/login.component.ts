import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
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

  constructor(private http: HttpClient, private router: Router) {}

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
        },
        error: (err) => {
          this.error = 'Login fehlgeschlagen. Bitte überprüfe deine Eingaben.';
          console.error('Fehler:', err);
          this.loading = false;
        }
      });

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
      });
      
      this.http.get<string>('https://breshub-engine.etiennebader.de/credentials/getMail', { headers })
      .subscribe({
        next: (response) => {
          this.router.navigate(['/dashboard'], { queryParams: { token: this.token } });
        },
        error: (err) => {
          this.error = 'Login fehlgeschlagen. Bitte überprüfe deine Eingaben.';
          console.error('Fehler:', err);
          this.loading = false;
        }
      });


  }
}
