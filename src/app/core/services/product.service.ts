import { Injectable } from '@angular/core';
import { Database, get, onValue, query, ref } from '@angular/fire/database';
import { BehaviorSubject, filter, from, map, Observable, switchMap, take } from 'rxjs';
import { Product } from '../models/product.model';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private connected = new BehaviorSubject<boolean>(false);
  private productsRef: AngularFireList<any>;

  constructor(private afDb: AngularFireDatabase) {
    // Usamos la instancia de Database de AngularFireDatabase para la conexión
    const db = afDb.database;
    const connectedRef = ref(db, '.info/connected');
    
    this.productsRef = afDb.list('products');
    
    onValue(connectedRef, (snapshot) => {
      this.connected.next(snapshot.val() === true);
    });
  }

  getProducts(): Observable<Product[]> {
    return this.connected.pipe(
      filter(isConnected => isConnected),
      take(1),
      switchMap(() => {
        // Usamos la misma instancia de Database que ya tenemos
        const db = this.afDb.database;
        const productsRef = ref(db, 'products');
        
        return from(get(query(productsRef))).pipe(
          map(snapshot => {
            if (!snapshot.exists()) {
              console.warn('No hay productos en la ruta especificada');
              return [];
            }

            const products: Product[] = [];
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

  createProduct(productData: Omit<Product, 'id'>): Promise<Product & { id: string }> {
    const newProduct = {
      ...productData,
      isActive: true,
      createdAt: Date.now()
    };

    return this.productsRef.push(newProduct)
      .then(ref => ({
        id: ref.key as string,
        ...newProduct
      }))
      .catch(error => {
        console.error('Error creating product:', error);
        throw error;
      });
  }

  // Método adicional para obtener el estado de conexión si es necesario
  getConnectionStatus(): Observable<boolean> {
    return this.connected.asObservable();
  }
}