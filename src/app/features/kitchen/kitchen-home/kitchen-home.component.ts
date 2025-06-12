import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { Observable, of } from 'rxjs';

interface OrderItem {
  product: {
    id: number;
    name: string;
    description: string;
  };
  quantity: number;
  notes?: string;
}

interface Order {
  id: number;
  createdAt: Date;
  completedAt?: Date;
  preparationTime: number;
  items: OrderItem[];
}

@Component({
  selector: 'app-kitchen-home',
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
  styleUrl: './kitchen-home.component.scss'
})

export class KitchenHomeComponent {
  // Usamos signals para el estado
  receivedOrders = signal<Order[]>([
    {
      id: 1,
      createdAt: new Date(),
      preparationTime: 15,
      items: [
        {
          product: { id: 1, name: 'Hamburguesa', description: 'Con queso y tocino' },
          quantity: 2,
          notes: 'Sin cebolla'
        }
      ]
    }
  ]);

  preparingOrders = signal<Order[]>([
    {
      id: 2,
      createdAt: new Date(Date.now() - 1000 * 60 * 5),
      preparationTime: 10,
      items: [
        {
          product: { id: 3, name: 'Pizza', description: 'Jamón y champiñones' },
          quantity: 1,
          notes: 'Bien cocida'
        }
      ]
    }
  ]);

  completedOrders = signal<Order[]>([]);

  completedOrdersColumns = ['orderId', 'time', 'items'];

  startPreparation(order: Order) {
    this.receivedOrders.update(orders => orders.filter(o => o.id !== order.id));
    this.preparingOrders.update(orders => [...orders, order]);
  }

  markAsReady(order: Order) {
    this.preparingOrders.update(orders => orders.filter(o => o.id !== order.id));
    this.completedOrders.update(orders => [...orders, {
      ...order,
      completedAt: new Date()
    }]);
  }
}