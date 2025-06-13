// dialog-gemini.component.ts
import { Component, Inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GeminiService } from '../../../core/services/gemini.service';

@Component({
  selector: 'app-dialog-gemini',
  templateUrl: './dialog-gemini.component.html',
  styleUrls: ['./dialog-gemini.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
})
export class DialogGeminiComponent {
  questionControl = new FormControl('', [Validators.required]);
  answer: string | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { product: any },
    private dialogRef: MatDialogRef<DialogGeminiComponent>,
    private gemini: GeminiService
  ) { }

  askQuestion() {
    if (this.questionControl.invalid) return;

    const question = (this.questionControl.value ?? '').trim();
    if (!question) return;

    // Construir prompt similar al componente anterior
    const product = this.data.product;
    const title = product.title?.trim() || 'el producto';
    const manufacturer = product.manufacturer?.trim();
    const description = product.description?.trim();

    const manufacturerPart = manufacturer ? ` de "${manufacturer}"` : '';
    const descriptionPart = description ? ` Descripción: ${description}.` : '';

    const prompt = `Estoy interesado en ${title}${manufacturerPart}.${descriptionPart} Pregunta: ${question}`;

    this.loading = true;
    this.answer = null;
    this.error = null;

    this.gemini.ask(prompt).subscribe({
      next: (response) => {
        this.answer = response;
        this.loading = false;
      },
      error: () => {
        this.error = 'Ocurrió un error al consultar a la IA.';
        this.loading = false;
      },
    });
  }

  close() {
    this.dialogRef.close();
  }
}
