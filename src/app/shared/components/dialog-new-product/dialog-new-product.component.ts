import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-new-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './dialog-new-product.component.html',
  styleUrl: './dialog-new-product.component.scss'
})
export class DialogNewProductComponent {
  // Inyección de dependencias
  dialogRef = inject(MatDialogRef<DialogNewProductComponent>);
  data = inject(MAT_DIALOG_DATA, { optional: true });
  fb = inject(FormBuilder);

  // Formulario reactivo
  productForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.maxLength(200)]],
    price: ['', [Validators.required, Validators.min(0)]],
    image: [null as File | null]
  });

  // Vista previa de la imagen
  imagePreview: string | ArrayBuffer | null = null;

  // Manejo de selección de archivo
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) {
      const file = input.files[0];
      this.productForm.patchValue({ image: file });
      this.productForm.get('image')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Envío del formulario
  onSubmit(): void {
    if (this.productForm.valid) {
      this.dialogRef.close(this.productForm.value);
    }
  }

  // Cancelar
  onCancel(): void {
    this.dialogRef.close();
  }
}