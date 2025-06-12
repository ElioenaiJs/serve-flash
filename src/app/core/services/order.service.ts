import { inject, Injectable } from '@angular/core';
import { Database, ref, query, get, onValue } from '@angular/fire/database';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { map, filter, take, switchMap } from 'rxjs/operators';
import { Order } from '../models/order.model';

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
}