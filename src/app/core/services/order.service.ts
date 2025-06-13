import { inject, Injectable } from '@angular/core';
import { Database, get, onValue, query, ref } from '@angular/fire/database';
import { push, set } from 'firebase/database';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { CreateOrderRequest, Order, OrderItem } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private db = inject(Database);
  private connected = new BehaviorSubject<boolean>(false);

  constructor() {
    const connectedRef = ref(this.db, '.info/connected');
    onValue(connectedRef, (snapshot) => {
      this.connected.next(snapshot.val() === true);
    });
  }


  getOrders(): Observable<Order[]> {
    return this.connected.pipe(
      filter(isConnected => isConnected),
      take(1),
      switchMap(() => {
        const ordersRef = ref(this.db, 'orders');
        return from(get(query(ordersRef))).pipe(
          map(snapshot => {
            if (!snapshot.exists()) return [];

            const orders: Order[] = [];
            snapshot.forEach(childSnapshot => {
              const orderData = childSnapshot.val();
              orders.push({
                id: childSnapshot.key as string, // Mapeamos la key de Firebase a id
                ...orderData,
                tableNumber: orderData.tablNumber || orderData.tableNumber, // Maneja ambos casos
                preparationTime: orderData.preparationTime || 0 // Valor por defecto
              });
            });
            return orders;
          })
        );
      })
    );
  }

  async createOrder(orderData: CreateOrderRequest): Promise<Order> {
    const newOrder: Order = {
      createdAt: Date.now(),
      updatedAt: Date.now(),
      customerId: orderData.customerId,
      items: orderData.items.reduce((acc, item) => {
        acc[item.productId] = {
          productId: item.productId,
          name: item.name,
          quantity: item.quantity,
          unitPrice: item.unitPrice
        };
        return acc;
      }, {} as { [key: string]: OrderItem }),
      notes: orderData.notes,
      status: 'pending',
      tableNumber: orderData.tableNumber,
      total: orderData.items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0)
    };

    try {
      const ordersRef = ref(this.db, 'orders');
      const newOrderRef = push(ordersRef);
      await set(newOrderRef, newOrder);
      
      return {
        id: newOrderRef.key as string,
        ...newOrder
      };
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  getOrdersLive(): Observable<Order[]> {
  const ordersRef = ref(this.db, 'orders');

  return new Observable<Order[]>(subscriber => {
    const unsubscribe = onValue(ordersRef, (snapshot) => {
      const orders: Order[] = [];

      snapshot.forEach(childSnapshot => {
        const orderData = childSnapshot.val();
        orders.push({
          id: childSnapshot.key as string,
          ...orderData,
          tableNumber: orderData.tablNumber || orderData.tableNumber,
          preparationTime: orderData.preparationTime || 0
        });
      });

      subscriber.next(orders);
    }, (error) => {
      console.error('Error al escuchar pedidos:', error);
      subscriber.error(error);
    });

    // cleanup
    return () => unsubscribe();
  });
}

}