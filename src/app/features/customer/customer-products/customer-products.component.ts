// customer-products.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { menuCategories, Product } from './customer-products';
import { CartService, ProductService } from '../../../core';

@Component({
  selector: 'app-client-products',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatTooltipModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './customer-products.component.html',
  styleUrls: ['./customer-products.component.scss']
})
export class CustomerProductsComponent implements OnInit {
  selectedCategory = 'Todos los productos';
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  public products: any[] = [];
  public loading = true;
  public error: string | null = null;
  addedItems: Record<string, boolean> = {};
  menuCategories = menuCategories;



  ngOnInit() {
    this.fetchProducts();
  }

  public fetchProducts() {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
        console.log(products);
      },
      error: (err) => {
        this.error = 'Error al cargar productos';
        this.loading = false;
        console.error(err);
      }
    });
  }

  get filteredProducts(): Product[] {
    if (this.selectedCategory === 'Todos los productos') {
      return this.products;
    }
    return this.products.filter(product =>
      product.categories?.includes(this.selectedCategory.toLowerCase())
    );
  }

  handleAddToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.addedItems[product.id] = true;
    setTimeout(() => {
      this.addedItems[product.id] = false;
    }, 2000);
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }
}