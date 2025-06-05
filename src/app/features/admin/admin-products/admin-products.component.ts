import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { menuItems, products } from './admin-products';
import { DialogNewProductComponent } from '../../../shared';


@Component({
  selector: 'app-admin-products',
  imports: [MatSidenavModule, MatButtonModule, MatIconModule, MatListModule, MatCardModule],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.scss'
})
export class AdminProductsComponent {
  public readonly dialog = inject(MatDialog);

  public isMenuOpen = true;
  public showFiller = false;
  menuItems = menuItems;
  products = products;

  public addProduct() {
    const dialogRef = this.dialog.open(DialogNewProductComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
