import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatChipsModule
  ],
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {
  user = {
    photoURL: 'assets/images/default-avatar.png',
    displayName: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Administrador',
    phone: '+1 234 567 890',
    location: 'Ciudad de México',
    createdAt: new Date('2023-01-01'),
    status: 'active'
  };

  ngOnInit() {
    // Aquí cargarías los datos reales del usuario
  }
}
