import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule,
    RouterLink
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  private router = inject(Router)
  private authService = inject(AuthService);
  notificationsCount = 5;
  profileMenuOpen = false;

  menuItems = [
    { name: 'Dashboard', icon: 'dashboard', route: '/admin/dashboard' },
    { name: 'Productos', icon: 'inventory_2', route: '/admin/products' },
    { name: 'Usuarios', icon: 'manage_accounts', route: '/admin/users' }
  ];

  menuItemsClient = [
    { route: '/admin/dashboard', icon: 'home', name: 'Inicio' },
    { route: '/admin/products', icon: 'inventory', name: 'Productos' },
    { route: '/admin/cart', icon: 'shopping_cart', name: 'Carrito' }
  ];


  quickActions = [
    { name: 'Nuevo Producto', icon: 'add_circle', action: 'addProduct' },
    { name: 'Agregar Usuario', icon: 'person_add', action: 'addUser' }
  ];

  onQuickAction(action: string) {
    console.log('Acción rápida:', action);
  }

  logout() {
    this.authService.logout();
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  menuVisible = false;

  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }
}
