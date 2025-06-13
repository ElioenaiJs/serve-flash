import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { map } from 'rxjs';
import { AuthService, CartItem, CartService, CreateOrderRequest, OrderService } from '../../../core';

@Component({
  selector: 'app-customer-cart-component',
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
  styleUrls: ['./customer-cart-component.component.scss']
})

export class CustomerCartComponentComponent {
  private orderService = inject(OrderService);
  private cartService = inject(CartService);
  private authService = inject(AuthService);

  cartItems = this.cartService.cartItems;

  total$ = toObservable(this.cartService.cartItems).pipe(
    map((items: CartItem[]) =>
      items.reduce((total, item) => total + item.product.price * item.quantity, 0)
    )
  );

  public async checkout() {
    const items = this.cartService.cartItems();

    if (items.length === 0) {
      console.log('El carrito está vacío');
      return;
    }

    const user = this.authService['auth'].currentUser;

    if (!user) {
      console.error('No hay usuario autenticado');
      return;
    }

    const orderData: CreateOrderRequest = {
      customerId: user.uid,
      items: items.map((item: CartItem) => ({
        productId: item.product.id,
        name: item.product.name,
        quantity: item.quantity,
        unitPrice: item.product.price
      })),
      tableNumber: 1,
      notes: ''
    };

    try {
      console.log('Creando orden con los siguientes datos:', orderData);
      const order = await this.orderService.createOrder(orderData);
      this.cartService.clearCart();
    } catch (error) {
      console.error('Error al crear la orden:', error);
    }
  }

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
}
