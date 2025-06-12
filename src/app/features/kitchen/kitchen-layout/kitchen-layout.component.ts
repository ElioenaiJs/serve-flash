import { Component } from '@angular/core';
import { MenuComponent } from '../../../shared';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-kitchen-layout',
  imports: [MenuComponent, RouterOutlet],
  templateUrl: './kitchen-layout.component.html',
  styleUrl: './kitchen-layout.component.scss'
})
export class KitchenLayoutComponent {

}
