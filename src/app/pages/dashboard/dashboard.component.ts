import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { TokenService } from '../services/token.service';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  token: string = '';
  username: string = '';
  password: string = '';
  email : string = '';

  constructor(private route: ActivatedRoute, private tokenService: TokenService, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.token = this.tokenService.getToken();
    console.log('Token:', this.token);
    this.getUsername();
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
