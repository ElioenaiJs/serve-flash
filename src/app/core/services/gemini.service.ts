// gemini.service.ts
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { geminiModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  ask(prompt: string): Observable<string> {
    return from(
      geminiModel.generateContent({
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }]
          }
        ]
      }).then(res =>
        res.response?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'Sin respuesta'
      )
    );
  }
}
