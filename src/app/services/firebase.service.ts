import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface Email {
  id: string;
  email: string | null;
  source?: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private firestorePromise: Promise<any> | null = null;

  /**
   * Lazy-loads Firebase & Firestore only when a user actually submits an email
   * (keeps Firebase completely out of the initial landing bundle).
   */
  private async getLazyFirestore(): Promise<any> {
    if (!this.firestorePromise) {
      this.firestorePromise = (async () => {
        const [{ initializeApp, getApps, getApp }, { getFirestore }] = await Promise.all([
          import('firebase/app'),
          import('firebase/firestore')
        ]);
        const app = getApps().length ? getApp() : initializeApp(environment.firebase);
        return getFirestore(app);
      })();
    }
    return this.firestorePromise;
  }

  public async saveEmail(email: Email): Promise<any> {
    const db = await this.getLazyFirestore();
    const { collection, doc, addDoc } = await import('firebase/firestore');
    email.id = doc(collection(db, 'id')).id;
    return addDoc(collection(db, 'emailsNoticie'), email);
  }

  public async saveIosWaitlistEmail(rawEmail: string): Promise<any> {
    return this.saveEmail({
      id: '',
      email: rawEmail.trim().toLowerCase(),
      source: 'ios_waitlist',
      createdAt: new Date().toISOString()
    });
  }
}
