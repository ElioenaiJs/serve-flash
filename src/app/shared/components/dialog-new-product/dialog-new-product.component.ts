import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ProductService } from '../../../core';
import { firstValueFrom } from 'rxjs';

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
    MatDialogModule,
    MatSelectModule
  ],
  templateUrl: './dialog-new-product.component.html',
  styleUrl: './dialog-new-product.component.scss'
})
export class DialogNewProductComponent {
  public dialogRef = inject(MatDialogRef<DialogNewProductComponent>);
  public data = inject(MAT_DIALOG_DATA, { optional: true });
  public fb = inject(FormBuilder);
  private productService = inject(ProductService);

  public productForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.maxLength(200)]],
    price: [0, [Validators.required, Validators.min(0)]],
    image: [null as File | null, [Validators.required]],
    category: ['', [Validators.required]]
  });

  public imagePreview: string | ArrayBuffer | null = null;
  public isSubmitting = false;

  public onFileSelected(event: Event): void {
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

  public async onSubmit(): Promise<void> {
    if (this.productForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      try {
        const formValue = this.productForm.value;

        const file = formValue.image as File;
        if (!file || !(file instanceof File)) {
          throw new Error('El archivo de imagen no es válido');
        }

        const { imageUrl } = await firstValueFrom(this.productService.uploadImage(file));

        await this.productService.createProduct({
          name: formValue.name!,
          description: formValue.description!,
          price: formValue.price!,
          categories: [formValue.category!],
        }, imageUrl);

        this.dialogRef.close(true);
      } catch (error) {
        console.error('Error al crear el producto:', error);
      } finally {
        this.isSubmitting = false;
      }
    }
  }


  public onCancel(): void {
    this.dialogRef.close();
  }
}