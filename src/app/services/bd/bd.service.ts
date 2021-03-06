import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class BdService {

  constructor(private firestore: AngularFirestore, private httpClient: HttpClient) {
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
      Precio: datou.Precio,
      Vendidos: datou.Vendidos
    });
  }
  borrarMenu(datosid: string) {
    this.firestore.doc('Platillos/' + datosid).delete();
  }
  getCodigos() {
    return this.httpClient.get('https://us-central1-tikinova-a9918.cloudfunctions.net/qrapi');
  }

  getPedidos() {
    return this.httpClient.get('https://us-central1-tikinova-a9918.cloudfunctions.net/grafica');
  }
  aumentarVenta(id: string, cant: number) {
    this.firestore.collection('Platillos').doc(id).update({
      Vendidos: cant
    });
  }
  agregarOrden(datoc: any) {
    return this.firestore.collection('Pedidos').add(datoc);
  }
  getOrdenes() {
    return this.firestore.collection('Pedidos').snapshotChanges();
  }
}
