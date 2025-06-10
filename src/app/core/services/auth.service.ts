import { inject, Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@angular/fire/auth";
import { Firestore, doc, setDoc, getDoc } from "@angular/fire/firestore";
import { from, map, Observable, switchMap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  /**
   * Registro de usuario con email y contraseña.
   * También almacena el usuario en Firestore con rol 'estudiante'.
   */
  register(email: string, username: string, password: string): Observable<void> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(({ user }) => {
        if (!user) throw new Error('Usuario no creado');
        const userRef = doc(this.firestore, 'users', user.uid);
        return from(setDoc(userRef, {
          email,
          username,
          role: 'customer' // Puedes personalizar el rol
        }));
      }),
      map(() => void 0) // Devuelve void para cumplir la firma
    );
  }

  /**
   * Login del usuario y obtención de su perfil desde Firestore.
   */
  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(({ user }) => {
        if (!user) throw new Error('Usuario no encontrado');
        const userRef = doc(this.firestore, 'users', user.uid);
        return from(getDoc(userRef)).pipe(
          map(docSnap => {
            if (!docSnap.exists()) throw new Error('Datos de usuario no encontrados');
            const userData = docSnap.data();
            localStorage.setItem('user', JSON.stringify(userData));
            return userData;
          })
        );
      })
    );
  }

  /**
   * Cierra la sesión.
   */
  logout(): void {
    this.auth.signOut();
    localStorage.removeItem('user');
  }

  /**
   * Verifica si hay un usuario autenticado.
   */
  isAuthenticated(): boolean {
    return !!this.auth.currentUser;
  }
}
