import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface CartItem {
  product: any;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  addToCart(product: any) {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentItems.push({ product, quantity: 1 });
    }

    this.cartItems.next([...currentItems]);
  }

  removeFromCart(productId: string) {
    const currentItems = this.cartItems.value.filter(item => item.product.id !== productId);
    this.cartItems.next(currentItems);
  }

  updateQuantity(productId: string, quantity: number) {
    const currentItems = this.cartItems.value;
    const item = currentItems.find(i => i.product.id === productId);

    if (item) {
      item.quantity = quantity;
      this.cartItems.next([...currentItems]);
    }
  }

  clearCart() {
    this.cartItems.next([]);
  }

  getTotal() {
    return this.cartItems.value.reduce(
      (total, item) => total + (item.product.price * item.quantity), 0
    );
  }
}