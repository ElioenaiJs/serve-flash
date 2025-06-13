import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../core/services/users.service';
import { User } from '../../../core/models/user.model';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Angular Material imports
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    // Angular Material modules
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatPaginatorModule
  ],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  users$!: Observable<User[]>;
  newUser: Omit<User, 'id'> = { username: '', email: '', role: 'customer' };
  editingUserId: string | null = null;
  editUserData: Partial<User> = {};
  
  // Columnas para la tabla
  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];
  dataSource: User[] = [];

  constructor(
    private usersService: UsersService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.users$ = this.usersService.getUsers();
    this.users$.subscribe({
      next: (users) => {
        this.dataSource = users;
      },
      error: (err) => {
        this.showError('Error al cargar usuarios');
        console.error(err);
      }
    });
  }

 

  startEdit(user: User): void {
    if (!user.id) {
      this.showError('El usuario no tiene ID');
      return;
    }
    this.editingUserId = user.id;
    this.editUserData = { ...user };
  }

  async updateUser(): Promise<void> {
    try {
      if (this.editingUserId) {
        await this.usersService.updateUser(this.editingUserId, this.editUserData);
        this.cancelEdit();
        this.showSuccess('Usuario actualizado correctamente');
      }
    } catch (error) {
      this.showError('Error al actualizar usuario');
      console.error(error);
    }
  }

  cancelEdit(): void {
    this.editingUserId = null;
    this.editUserData = {};
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      if (confirm('¿Estás seguro de eliminar este usuario?')) {
        await this.usersService.deleteUser(userId);
        this.showSuccess('Usuario eliminado correctamente');
      }
    } catch (error) {
      this.showError('Error al eliminar usuario');
      console.error(error);
    }
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }
}