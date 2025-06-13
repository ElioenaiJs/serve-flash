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
import { GeminiService } from '../../../core/services/gemini.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { DialogGeminiComponent } from '../../../shared/components/dialog-gemini/dialog-gemini.component';
import { MatDialog } from '@angular/material/dialog';

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
    MatDividerModule,
    MatFormField,
    MatLabel,
    FormsModule
  ],
  templateUrl: './customer-products.component.html',
  styleUrls: ['./customer-products.component.scss']
})
export class CustomerProductsComponent implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private dialog = inject(MatDialog);
  public products: any[] = [];
  public loading = true;
  public error: string | null = null;
  public addedItems: Record<string, boolean> = {};
  public menuCategories = menuCategories;

  public selectedCategory: string = menuCategories[0].title;

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
    // Normaliza la comparación de categorías
    this.selectedCategory = this.menuCategories.find(c =>
      c.title.toLowerCase() === category.toLowerCase()
    )?.title || this.menuCategories[0].title;

  }
  openGeminiDialog(product: any) {
  const dialogRef = this.dialog.open(DialogGeminiComponent, {
    width: '400px',
    data: { product }
  });

  dialogRef.afterClosed().subscribe(() => {
    // Opcional: acciones después de cerrar el diálogo
  });
}

}