import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  errorMessage: string | null = null;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  }, { validators: this.passwordsMatchValidator });

  onSubmit(): void {
    this.errorMessage = null;

    if (this.registerForm.invalid) return;

    const { email, username, password } = this.registerForm.value;

    this.authService.register(email!, username!, password!)
      .subscribe({
        next: () => this.router.navigate(['/login']),
        error: (error) => {
          if (error?.code === 'auth/email-already-in-use') {
            this.errorMessage = 'Este correo ya está en uso.';
          } else if (error?.code === 'auth/invalid-email') {
            this.errorMessage = 'El correo electrónico no es válido.';
          } else if (error?.code === 'auth/weak-password') {
            this.errorMessage = 'La contraseña es muy débil.';
          } else {
            this.errorMessage = 'Ocurrió un error inesperado.';
          }
        }
      });
  }

  // Validator para que password y confirmPassword coincidan
  private passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordsMismatch: true };
  }

  // Para mostrar error si las contraseñas no coinciden
  get passwordsDoNotMatch(): boolean {
    return this.registerForm.hasError('passwordsMismatch') &&
           this.registerForm.get('confirmPassword')?.touched!;
  }

  registerWithGoogle() {
    this.authService.signInWithGoogle().subscribe({
      next: (result) => {
        this.router.navigate(['/login']); // o donde quieras llevar al usuario
      },
      error: (err) => {
        this.errorMessage = 'Error al registrarse con Google.';
        console.error(err);
      }
    });
  }
}