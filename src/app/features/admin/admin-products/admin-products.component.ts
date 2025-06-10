import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ProductService } from '../../../core';
import { DialogNewProductComponent } from '../../../shared';
import { menuItems, products } from './admin-products';

@Component({
  selector: 'app-admin-products',
  imports: [MatSidenavModule, MatButtonModule, MatIconModule, MatListModule, MatCardModule],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.scss'
})
export class AdminProductsComponent implements OnInit {
  public readonly dialog = inject(MatDialog);
  private readonly productService = inject(ProductService);
  public productss: any[] = [];
  public loading = true;
  public error: string | null = null;
  public product: any[] = [];
  public isMenuOpen = true;
  public showFiller = false;
  public menuItems = menuItems;
  public products = products;

  ngOnInit() {
    this.fetchProducts();
  }

  public fetchProducts() {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.productss = products;
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

  public addProduct() {
    const dialogRef = this.dialog.open(DialogNewProductComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
