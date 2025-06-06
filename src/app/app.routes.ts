import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shared/components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('./features/admin/admin-users/admin-users.component').then(m => m.AdminUsersComponent)
      },
      {
        path: 'sales',
        loadComponent: () => import('./features/admin/admin-sales/admin-sales.component').then(m => m.AdminSalesComponent)
      },
      {
        path: 'inventory',
        loadComponent: () => import('./features/admin/admin-inventory/admin-inventory.component').then(m => m.AdminInventoryComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./features/admin/admin-configuration/admin-configuration.component').then(m => m.AdminConfigurationComponent)
      },
      {
        path: 'products',
        loadComponent: () => import('./features/admin/admin-products/admin-products.component').then(m => m.AdminProductsComponent)
      },
      { path: '', redirectTo: 'products', pathMatch: 'full' }
    ]
  },
  {
    path: 'client',
    loadComponent: () => import('./features/client/customer-layout/customer-layout.component').then(m => m.CustomerLayoutComponent),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./features/client/customer-home/customer-home.component').then(m => m.CustomerHomeComponent)
      },
      {
        path: 'products',
        loadComponent: () => import('./features/client/customer-products/customer-products.component').then(m => m.CustomerProductsComponent)
      },
      {
        path: 'cart',
        loadComponent: () => import('./features/client/customer-cart-component/customer-cart-component.component').then(m => m.CustomerCartComponentComponent)
      }
    ]
  },
  { path: '**', redirectTo: '' }
];