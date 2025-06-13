import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { Subscription } from 'rxjs';

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
    RouterLink,
    AngularFireAuthModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private authService = inject(AuthService);
  private authSubscription: Subscription | undefined;
  
  notificationsCount = 5;
  profileMenuOpen = false;
  userRole: string = '';
  isAdmin: boolean = false;
  menuVisible = false;

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

  menuKitchenItems: any[] = [];

  quickActions = [
    { name: 'Nuevo Producto', icon: 'add_circle', action: 'addProduct' },
    { name: 'Agregar Usuario', icon: 'person_add', action: 'addUser' }
  ];

  ngOnInit() {
    this.checkAuthState();
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  private checkAuthState() {
    if (this.authService.isAuthenticated()) {
      this.loadUserRole();
    } else {
      // Escuchar cambios en la autenticación si es necesario
      // Esto dependerá de cómo manejes el estado de autenticación
    }
  }

  private loadUserRole() {
    const currentUser = this.authService['auth'].currentUser; // Acceso directo al usuario de Firebase
    if (currentUser) {
      this.authSubscription = this.authService.getUserRole(currentUser.uid).subscribe({
        next: (role) => {
          this.userRole = role;
          this.isAdmin = this.userRole === 'admin';
        },
        error: (err) => {
          console.error('Error al obtener el rol:', err);
          this.userRole = 'customer';
          this.isAdmin = false;
        }
      });
    }
  }

  getMenuItems() {
    switch (this.userRole) {
      case 'admin': return this.menuItems;
      case 'customer': return this.menuItemsClient;
      case 'kitchen': return this.menuKitchenItems;
      default: return [];
    }
  }

  showQuickActions() {
    return this.isAdmin;
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

  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }
}