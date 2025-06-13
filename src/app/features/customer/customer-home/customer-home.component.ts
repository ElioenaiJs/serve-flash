import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-home',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule
  ],
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.scss']
})
export class CustomerHomeComponent {
  private readonly router = inject(Router);
  
  public navigateToProducts() {
    this.router.navigate(['/customer/products']);  
  }
}