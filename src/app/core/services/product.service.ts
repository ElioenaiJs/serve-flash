import { inject, Injectable } from '@angular/core';
import { Database, get, onValue, query, ref } from '@angular/fire/database';
import { BehaviorSubject, filter, from, map, Observable, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private db = inject(Database);
  private connected = new BehaviorSubject<boolean>(false);

  constructor() {
    const connectedRef = ref(this.db, '.info/connected');
    onValue(connectedRef, (snapshot) => {
      this.connected.next(snapshot.val() === true);
    });
  }

  getProducts(): Observable<any[]> {
    return this.connected.pipe(
      filter(isConnected => isConnected),
      take(1),
      switchMap(() => {
        const productsRef = ref(this.db, 'products');
        return from(get(query(productsRef))).pipe(
          map(snapshot => {
            if (!snapshot.exists()) {
              console.warn('No hay productos en la ruta especificada');
              return [];
            }

            const products: any[] = [];
            snapshot.forEach(childSnapshot => {
              products.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
              });
            });
            return products;
          })
        );
      })
    );
  }
}