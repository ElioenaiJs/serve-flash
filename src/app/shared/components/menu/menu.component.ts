import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';

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
  notificationsCount = 5;
  profileMenuOpen = false;

  menuItems = [
    { name: 'Dashboard', icon: 'dashboard', route: '/admin/dashboard' },
    { name: 'Productos', icon: 'inventory_2', route: '/admin/products' },
    { name: 'Inventario', icon: 'warehouse', route: '/admin/inventory' },
    { name: 'Ventas', icon: 'point_of_sale', route: '/admin/sales' },
    { name: 'Configuración', icon: 'settings', route: '/admin/settings' },
    { name: 'Usuarios', icon: 'manage_accounts', route: '/admin/users' }
  ];

  quickActions = [
    { name: 'Nuevo Producto', icon: 'add_circle', action: 'addProduct' },
    { name: 'Agregar Usuario', icon: 'person_add', action: 'addUser' }
  ];

  onQuickAction(action: string) {
    console.log('Acción rápida:', action);
  }
}
