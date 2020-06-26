import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BdService {

  constructor(private firestore: AngularFirestore) {
   }
  isAdmin() {
    return this.firestore.collection('Admins').snapshotChanges();
  }
  getMenu() {
    return this.firestore.collection('Platillos').snapshotChanges();
  }
  createMenu(datoc: any) {
    return this.firestore.collection('Platillos').add(datoc);
  }
  updateMenu(datou: any, id: string) {
    this.firestore.collection('Platillos').doc(id).update({
      Nombre: datou.Nombre,
      Descripcion: datou.Descripcion,
      Precio: datou.Precio
    });
  }
  borrarMenu(datosid: string) {
    this.firestore.doc('Platillos/' + datosid).delete();
  }
  getCodigos() {
    return this.firestore.collection('Descuentos').snapshotChanges();
  }
}
