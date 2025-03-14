import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Toast } from 'primeng/toast';
import { Button } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ConfirmDialogModule, Toast, Button],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css',
  providers: [ConfirmationService, MessageService]
})
export class PricingComponent {
constructor(private confirmationService: ConfirmationService, private router: Router, private messageService: MessageService) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  navigateToFeature() {
    this.router.navigate(['/feature']);
  }

  navigateToPricing() {
    this.router.navigate(['/pricing']);
  }

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}