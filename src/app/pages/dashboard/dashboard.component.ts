import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TokenService } from '../services/token.service';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { Observable } from 'rxjs';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ButtonModule,
    MenuModule,
    ToastModule,
    AvatarModule,
    BadgeModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  items: MenuItem[] = [];
  token: string = '';
  username: string = '';
  password: string = '';
  email: string = '';
  isSidebarVisible = true;

  constructor(private tokenService: TokenService, private http: HttpClient, private router: Router) {
    this.tokenService.getToken().subscribe(token => {
      if (token) {
        this.token = token;
        console.log('Token gefunden:', this.token);
        this.getUsername();
      } else {
        console.warn('Kein Token vorhanden.');
      }
    });

    this.setupMenu();
  }

  setupMenu() {
    this.items = [
      {
        label: 'Datei',
        icon: 'pi pi-file',
        items: [
          { label: 'Neu', icon: 'pi pi-plus', command: () => this.onNew() },
          { label: 'Öffnen', icon: 'pi pi-folder-open' },
          { label: 'Speichern', icon: 'pi pi-save' }
        ]
      },
      {
        label: 'Bearbeiten',
        icon: 'pi pi-pencil',
        items: [
          { label: 'Kopieren', icon: 'pi pi-copy' },
          { label: 'Einfügen', icon: 'pi pi-paste' }
        ]
      },
      {
        label: 'Einstellungen',
        icon: 'pi pi-cog',
        items: [
          { label: 'Optionen', icon: 'pi pi-sliders-h' },
          { label: 'Hilfe', icon: 'pi pi-info' },
          { label: 'Logout', icon: 'pi pi-sign-out',  command: () => this.logout()}
        ]
      }
    ];
  }

  getUsername() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get< string >('https://breshub-engine.etiennebader.de/credentials/getUsername', { headers })
      .subscribe({
        next: (response) => {
          this.username = response;
          console.log('Username:', response);
        },
        error: (err) => console.error('Fehler beim Abrufen des Nutzernamens:', err)
      });
  }

  onNew() {
    console.log('Neue Datei erstellen');
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  logout() {
    this.tokenService.clearToken();
    this.router.navigate(['/']);
  }
}
