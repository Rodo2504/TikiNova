import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  noexiste = true;
  constructor(public afAuth: AngularFireAuth) { }
  async login(email: string, password: string) {
    try {
      const resultado = await this.afAuth.signInWithEmailAndPassword(email, password);
      return resultado;
    } catch (error) {
      console.log(error);
    }
  }
  async register(email: string, password: string) {
    try {
      const resultado = await this.afAuth.createUserWithEmailAndPassword(email, password);
      return resultado;
    } catch (error) {
      this.noexiste = false;
      return this.noexiste;
    }
  }
  async logout() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }
  getUser() {
    return this.afAuth.user;
  }
}
