import { Component } from '@angular/core';
import { MenuComponent } from '../../../shared';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-client-layout',
  imports: [MenuComponent, RouterOutlet],
  templateUrl: './client-layout.component.html',
  styleUrl: './client-layout.component.scss'
})
export class ClientLayoutComponent {

}
