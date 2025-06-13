import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, deleteDoc, updateDoc, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../../core/models/user.model'; // Asumiendo que tienes esta interfaz

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private firestore: Firestore) {}

  // Obtener todos los usuarios
  getUsers(): Observable<User[]> {
    const usersCollection = collection(this.firestore, 'users');
    return collectionData(usersCollection, { idField: 'id' }) as Observable<User[]>;
  }

  // Agregar un nuevo usuario
  async addUser(user: Omit<User, 'id'>): Promise<void> {
    const usersCollection = collection(this.firestore, 'users');
    await addDoc(usersCollection, user);
  }

  // Actualizar un usuario
  async updateUser(userId: string, data: Partial<User>): Promise<void> {
    const userDoc = doc(this.firestore, `users/${userId}`);
    await updateDoc(userDoc, data);
  }

  // Eliminar un usuario
  async deleteUser(userId: string): Promise<void> {
    const userDoc = doc(this.firestore, `users/${userId}`);
    await deleteDoc(userDoc);
  }
}