import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';

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
    MatDividerModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  notificationsCount = 5;
  profileMenuOpen = false;

  menuItems = [
    { name: 'Dashboard', icon: 'dashboard', route: '/admin/dashboard' },
    { name: 'Productos', icon: 'inventory_2', route: '/admin/products' },
    { name: 'Inventario', icon: 'warehouse', route: '/admin/inventory' },
    { name: 'Ventas', icon: 'point_of_sale', route: '/admin/sales' },
    { name: 'Clientes', icon: 'people', route: '/admin/customers' },
    { name: 'Reportes', icon: 'analytics', route: '/admin/reports' },
    { name: 'Configuración', icon: 'settings', route: '/admin/settings' },
    { name: 'Usuarios', icon: 'manage_accounts', route: '/admin/users' }
  ];

  quickActions = [
    { name: 'Nuevo Producto', icon: 'add_circle', action: 'addProduct' },
    { name: 'Registrar Venta', icon: 'add_shopping_cart', action: 'addSale' },
    { name: 'Agregar Usuario', icon: 'person_add', action: 'addUser' }
  ];

  onQuickAction(action: string) {
    console.log('Acción rápida:', action);
  }
}
