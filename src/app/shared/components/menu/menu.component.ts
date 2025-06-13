import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
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
  private router = inject(Router);
  private authService = inject(AuthService);
  
  notificationsCount = 5;
  profileMenuOpen = false;
  userRole: string = '';
  isAdmin: boolean = false;
  menuVisible = false;

  // Menu items by role
  menuItems = {
    admin: [
      { name: 'Dashboard', icon: 'dashboard', route: '/admin/dashboard' },
      { name: 'Productos', icon: 'inventory_2', route: '/admin/products' },
      { name: 'Usuarios', icon: 'manage_accounts', route: '/admin/users' }
    ],
    customer: [
     { name: 'Inicio', icon: 'home', route: '/customer/home' },
    { name: 'Productos', icon: 'shopping_bag', route: '/customer/products' },
    { name: 'Carrito', icon: 'shopping_cart', route: '/customer/cart' }
    ],
    kitchen: []
  };

  quickActions = [
    { name: 'Nuevo Producto', icon: 'add_circle', action: 'addProduct' },
    { name: 'Agregar Usuario', icon: 'person_add', action: 'addUser' }
  ];

  constructor() {
    this.loadUserRole();
  }

  private loadUserRole() {
    const currentUser = this.authService['auth'].currentUser;
    if (currentUser) {
      this.authService.getUserRole(currentUser.uid).subscribe({
        next: (role) => {
          this.userRole = role;
          this.isAdmin = this.userRole === 'admin';
        },
        error: () => {
          this.userRole = 'customer';
          this.isAdmin = false;
        }
      });
    }
  }

  onQuickAction(action: string) {
    if (action === 'addProduct') {
      this.router.navigate(['/admin/products/new']);
    } else if (action === 'addUser') {
      this.router.navigate(['/admin/users/new']);
    }
  }

  logout() {
    this.authService.logout();
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }
}