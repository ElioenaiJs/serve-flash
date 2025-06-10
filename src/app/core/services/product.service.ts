import { inject, Injectable } from '@angular/core';
import { Database, get, onValue, query, ref, push, set } from '@angular/fire/database';
import { BehaviorSubject, filter, from, map, Observable, switchMap, take } from 'rxjs';
import { Product } from '../models/product.model';

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

  getProducts(): Observable<Product[]> {
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

            const products: Product[] = [];
            snapshot.forEach(childSnapshot => {
              products.push({
                id: childSnapshot.key as string,
                ...childSnapshot.val()
              });
            });
            return products;
          })
        );
      })
    );
  }

  async createProduct(productData: Omit<Product, 'id' | 'isActive' | 'createdAt' | 'images'>, imageUrl: string): Promise<Product & { id: string }> {
    const newProduct: Product = {
      ...productData,
      images: [imageUrl], // Convertimos la URL en un array
      isActive: true,
      createdAt: Date.now()
    };

    try {
      const productsRef = ref(this.db, 'products');
      const newProductRef = push(productsRef);
      await set(newProductRef, newProduct);
      
      return {
        id: newProductRef.key as string,
        ...newProduct
      };
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
}
}