import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
<<<<<<< HEAD
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  providerId?: string;
}
=======
>>>>>>> c9da3ae (perfil de usuario)

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
<<<<<<< HEAD
  user: UserProfile | null = null;

  constructor(private afAuth: AngularFireAuth) {}

  ngOnInit() {
    this.afAuth.user.subscribe(firebaseUser => {
      if (firebaseUser) {
        this.user = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          providerId: firebaseUser.providerData[0]?.providerId
        };
        console.log('Usuario de Firebase:', this.user);
      } else {
        console.log('No hay usuario autenticado en Firebase');
        this.user = null;
      }
    });
=======
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
>>>>>>> c9da3ae (perfil de usuario)
  }
}
