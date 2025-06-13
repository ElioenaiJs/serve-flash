// src/app/ai/gemini.model.ts
import { getAI, getGenerativeModel, GoogleAIBackend } from '@firebase/ai';
import { initializeApp } from 'firebase/app';
import { environment } from '../../../environments/environment';

// Usa la misma config de Firebase (ya tienes todo en `environment.firebase`)
const firebaseApp = initializeApp(environment.firebase);

// Inicializa AI con backend de Google
const ai = getAI(firebaseApp, {
  backend: new GoogleAIBackend()
});

// Exporta el modelo que desees (ej: gemini-1.5-flash o gemini-1.5-pro)
export const geminiModel = getGenerativeModel(ai, {
  model: 'gemini-1.5-flash'
});
