import { Component, inject } from '@angular/core';
import { CartService } from '../../../core';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-client-cart-component',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatListModule,
  ],
  templateUrl: './customer-cart-component.component.html',
  styleUrl: './customer-cart-component.component.scss'
})
export class CustomerCartComponentComponent {
  private readonly cartService = inject(CartService);
  cartItems$ = this.cartService.cartItems$;
  total$ = this.cartService.cartItems$.pipe(
    map(items => items.reduce(
      (total, item) => total + (item.product.price * item.quantity), 0
    ))
  );

  public removeItem(productId: string) {
    this.cartService.removeFromCart(productId);
  }

  public updateQuantity(productId: string, event: any) {
    const quantity = parseInt(event.target.value, 10);
    if (quantity > 0) {
      this.cartService.updateQuantity(productId, quantity);
    }
  }

  public clearCart() {
    this.cartService.clearCart();
  }

  public checkout() {
    console.log('Procesando compra...', this.cartService.cartItems.value);
  }
}