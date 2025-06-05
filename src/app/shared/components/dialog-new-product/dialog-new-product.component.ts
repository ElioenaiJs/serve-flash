import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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

  public productForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.maxLength(200)]],
    price: ['', [Validators.required, Validators.min(0)]],
    image: [null as File | null, [Validators.required]],
    category: ['', [Validators.required]]
  });

  public imagePreview: string | ArrayBuffer | null = null;

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

  public onSubmit(): void {
    if (this.productForm.valid) {
      this.dialogRef.close(this.productForm.value);
    }
  }

  public onCancel(): void {
    this.dialogRef.close();
  }
}