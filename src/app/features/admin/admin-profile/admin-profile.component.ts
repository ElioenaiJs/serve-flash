import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface UserProfile {
  uid: string;
  email: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  role?: string;
  username?: string;
}

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {
  userProfile: UserProfile | null = null;
  loading = true;
  error = false;

  constructor(
    private authService: AuthService,
    private auth: Auth,
    private firestore: Firestore
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const currentUser = this.auth.currentUser;
      
      if (currentUser) {
        const userDocRef = doc(this.firestore, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        this.userProfile = {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
          role: userDoc.exists() ? userDoc.data()['role'] : undefined,
          username: userDoc.exists() ? userDoc.data()['username'] : undefined
        };
      }
    } catch (err) {
      console.error('Error loading profile:', err);
      this.error = true;
    } finally {
      this.loading = false;
    }
  }

  logout(): void {
    this.authService.logout();
  }

  getProfileImage(): string {
    return this.userProfile?.photoURL || 'assets/images/default-profile.png';
  }
}