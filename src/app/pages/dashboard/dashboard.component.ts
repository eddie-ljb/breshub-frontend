import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { TokenService } from '../services/token.service';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule, ButtonModule, MenuModule, ToastModule, AvatarModule, BadgeModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  items: MenuItem[] = [];
  token: string | null= '';
  username: string = '';
  password: string = '';
  email : string = '';

  constructor(private route: ActivatedRoute, private tokenService: TokenService, private http: HttpClient, private router: Router) {
    this.token = this.tokenService.getToken();
    if (this.token) {
      this.getUsername(); // Erst aufrufen, wenn der Token da ist
    } else {
      console.warn('Token nicht gefunden, warte auf Setzung...');
      this.waitForToken();
    }
      console.log('Token:', this.token);
      this.getUsername();  
    
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
            { label: 'Hilfe', icon: 'pi pi-info' }
          ]
        }
      ];

  }

  ngOnInit() {
    this.token = this.tokenService.getToken();
  if (this.token) {
    this.getUsername(); // Erst aufrufen, wenn der Token da ist
  } else {
    console.warn('Token nicht gefunden, warte auf Setzung...');
    this.waitForToken();
  }
    console.log('Token:', this.token);
    this.getUsername();

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
          { label: 'Hilfe', icon: 'pi pi-info' }
        ]
      }
    ];
  }

  
  
  onNew() {
    console.log('Neue Datei erstellen');
    this.token = this.tokenService.getToken();
    console.log('Token:', this.token);
    this.getUsername();

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
          { label: 'Hilfe', icon: 'pi pi-info' }
        ]
      }
    ];
  }

  

  getUsername() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokenService.getToken()}`
    });
    console.log(headers);
    this.http.get<string>('https://breshub-engine.etiennebader.de/credentials/getUsername', { headers })
    .subscribe({
      next: (response) => {
        this.username = response;
      }
    });
  }

  waitForToken() {
    const checkToken = setInterval(() => {
      this.token = this.tokenService.getToken();
      if (this.token) {
        clearInterval(checkToken);
        this.getUsername();
      }
    }, 500); // Überprüft alle 500ms, ob der Token gesetzt wurde
  }
  
}
