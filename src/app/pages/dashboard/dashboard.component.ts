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

  token: string = '';
  username: string = '';
  password: string = '';
  email : string = '';

  constructor(private route: ActivatedRoute, private tokenService: TokenService, private http: HttpClient, private router: Router) {}

  ngOnInit() {
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
  
  onNew() {
    console.log('Neue Datei erstellen');
  }

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  getUsername() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokenService.getToken()}`,
    });
    
    this.http.get<string>('https://breshub-engine.etiennebader.de/credentials/getUsername', { headers })
    .subscribe({
      next: (response) => {
        this.username = response;
      }
    });
  }
  
}
