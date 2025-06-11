import { inject, Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword } from "@angular/fire/auth";
import { Firestore, doc, setDoc, getDoc } from "@angular/fire/firestore";
import { signInWithPopup } from "firebase/auth";
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
  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(userCredential => {
        if (!userCredential.user) throw new Error('No se encontró el usuario');
        return from(userCredential.user.getIdToken()).pipe(
          map(token => ({
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            token
          }))
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

  getUserRole(uid: string): Observable<string> {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    return from(getDoc(userDocRef)).pipe(
      map(snapshot => {
        const data = snapshot.data();
        if (!data || !data['role']) throw new Error('No se encontró el rol del usuario');
        return data['role'];
      })
    );
  }

  signInWithGoogle(): Observable<void> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider)).pipe(
      switchMap(({ user }) => {
        if (!user) throw new Error('No se encontró el usuario en Google');
  
        const userRef = doc(this.firestore, 'users', user.uid);
  
        return from(getDoc(userRef)).pipe(
          switchMap(snapshot => {
            if (snapshot.exists()) {
              // Usuario ya registrado en Firestore, no hace falta crearlo
              return from(Promise.resolve());
            } else {
              // Usuario nuevo, lo registramos con rol default
              return from(setDoc(userRef, {
                email: user.email,
                username: user.displayName,
                role: 'customer' // asigna el rol que quieras aquí
              }));
            }
          })
        );
      })
    );
  }
  
}
