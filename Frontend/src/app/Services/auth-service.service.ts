import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private app: FirebaseApp) { }

    
  async createUser(email: string, password: string){
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }


  async signInAdmin(email: string, password: string): Promise<boolean> {
    try {
      const auth = getAuth(this.app);

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Signed in 
      const user = userCredential.user;
      return true;
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      return false;
    }
  }
}
