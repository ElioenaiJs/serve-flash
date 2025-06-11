import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit(): void {
    if (this.loginForm.invalid) return;
  
    const { email, password } = this.loginForm.value;
    console.log('Login data:', { email, password });
  
    this.authService.login(email!, password!).subscribe({
      next: (userData) => {
        // Guardar el token en sessionStorage
        localStorage.setItem('token', userData.token);
  
        // Obtener el rol del usuario desde Firestore
        this.authService.getUserRole(userData.uid).subscribe({
          next: (role) => {
            console.log('Rol del usuario:', role);
            // Redirigir según el rol
            if (role === 'admin') {
              this.router.navigate(['/admin']);
            } else if (role === 'customer') {
              this.router.navigate(['/customer/products']);
            } else {
              this.router.navigate(['/**']);
            }
          },
          error: (err) => {
            console.error('Error al obtener el rol:', err.message);
            // Si no hay rol definido, lo mandamos al dashboard por defecto
            this.router.navigate(['/dashboard']);
          }
        });
      },
      error: (err) => {
        console.error('Error al iniciar sesión:', err.message);
      }
    });
  }

  loginWithGoogle(): void {
    this.authService.signInWithGoogle().subscribe({
      next: () => {
        const currentUser = this.authService['auth'].currentUser;
        if (!currentUser) {
          console.error('No se pudo obtener el usuario actual');
          return;
        }
  
        this.authService.getUserRole(currentUser.uid).subscribe({
          next: (role) => {
            console.log('Rol del usuario (Google):', role);
            if (role === 'admin') {
              this.router.navigate(['/admin']);
            } else if (role === 'customer') {
              this.router.navigate(['/customer/products']);
            } else {
              this.router.navigate(['/dashboard']);
            }
          },
          error: (err) => {
            console.error('Error al obtener el rol:', err.message);
            this.router.navigate(['/login']);
          }
        });
      },
      error: (err) => {
        console.error('Error al iniciar sesión con Google:', err.message);
      }
    });
  }  
  
}