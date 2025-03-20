import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TokenService } from '../services/token.service';
import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { Observable } from 'rxjs';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { SidebarModule } from 'primeng/sidebar';
import { MeterGroupModule, MeterItem } from 'primeng/metergroup';
import { CardModule } from 'primeng/card';

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
    BadgeModule,
    SidebarModule,
    MeterGroupModule,
    CardModule
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
  groupsCounter: number = 0;
  isSidebarVisible = false;
  value: any[] = [];


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
        label: 'Menü',
        icon: 'pi pi-file',
        items: [
          { label: 'Dashboard', icon: 'pi pi-bars', command: () => this.router.navigate(['/dashboard']) },
        ]
      },
      {
        label: 'Gruppen',
        icon: 'pi pi-pencil',
        items: [
          { label: 'Übersicht', icon: 'pi pi-copy', command: () => this.router.navigate(['/gruppen-uebersicht']) },
          { label: 'Erstellen', icon: 'pi pi-plus', command: () => this.router.navigate(['/gruppen-erstellen']) },
          { label: 'Beitreten', icon: 'pi pi-user-plus', command: () => this.router.navigate(['/gruppen-beitreten']) },
          { label: 'Löschen', icon: 'pi pi-times', command: () => this.router.navigate(['/gruppen-entfernen']) }
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

  setupValues() {
    console.log("Values Counter:" + this.groupsCounter);
    let used = parseFloat((this.groupsCounter / 15).toFixed(2)) * 100;
    this.value = [
      { label: 'Gruppen', value: used, color: '#4CAF50', icon: 'pi pi-file' },
      { label: 'Andere', value: 0, color: '#9C27B0', icon: 'pi pi-folder' },
      { label: 'Freier Speicher', value: (100 - used), color: '#E0E0E0', icon: 'pi pi-hdd' }
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
          const params = new HttpParams().set('username', this.username);
          this.http.get<string>('https://breshub-engine.etiennebader.de/groups/getGroupsCounterOfUser', { headers, params })
    .subscribe({
      next: (response) => {
        this.groupsCounter = +response;
        console.log("Counter: " + this.groupsCounter);
        this.setupValues();
      },
      error: (err) => console.error('Fehler beim Abrufen der Gruppenanzahl:', err)
    });
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
