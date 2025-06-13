import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { Order } from '../../../core';
import { OrderService } from '../../../core/services/order.service';

interface OrderItem {
  product: {
    id: number;
    name: string;
    description: string;
  };
  quantity: number;
  notes?: string;
}

@Component({
  selector: 'app-kitchen-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatBadgeModule,
    MatExpansionModule,
    MatListModule,
    MatButtonModule,
    MatChipsModule,
    MatTableModule
  ],
  templateUrl: './kitchen-home.component.html',
  styleUrls: ['./kitchen-home.component.scss']
})

export class KitchenHomeComponent {
  private orderService = inject(OrderService);
  orders: Order[] = [];
  loading = true;
  error: string | null = null;

  receivedOrders = signal<Order[]>([]);
  preparingOrders = signal<Order[]>([]);
  completedOrders = signal<Order[]>([]);
  completedOrdersColumns = ['orderId', 'time', 'items'];

  ngOnInit() {
  this.orderService.getOrdersLive().subscribe({
    next: (orders) => {
      this.orders = orders;
      this.loading = false;
      this.initializeOrderSignals(orders);
    },
    error: (err) => {
      this.error = 'Error al cargar órdenes en tiempo real';
      this.loading = false;
      console.error(err);
    }
  });
}


  private initializeOrderSignals(orders: Order[]) {
    // Filtra las órdenes según su estado
    this.receivedOrders.set(orders.filter(order => order.status === 'pending'));
    this.preparingOrders.set(orders.filter(order => order.status === 'preparing'));
    this.completedOrders.set(orders.filter(order => order.status === 'completed'));
  }

  startPreparation(order: Order) {
    this.receivedOrders.update(orders => orders.filter(o => o.id !== order.id));
    this.preparingOrders.update(orders => [...orders, { ...order, status: 'preparing' }]);
    // Aquí deberías también actualizar la orden en el backend
  }

  markAsReady(order: Order) {
    this.preparingOrders.update(orders => orders.filter(o => o.id !== order.id));
    this.completedOrders.update(orders => [...orders, {
      ...order,
      status: 'completed',
      completedAt: new Date()
    }]);
    // Aquí deberías también actualizar la orden en el backend
  }

  getOrderItems(order: Order): any[] {
  // Si items es un array, lo devuelve directamente
  if (Array.isArray(order.items)) return order.items;
  
  // Si items es un objeto, lo convierte a array
  return Object.values(order.items || {});
}
}