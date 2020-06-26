import { BdService } from './../../../services/bd/bd.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
  todosdatos: any;
  todoscodigos: any;
  miorden: any;
  carrito = new Array();
  platillo: {row: number, id: '', Nombre: '', Precio: 0};
  cont = 0;
  total = 0.00;
  ordeno = false;
  constructor(private bdService: BdService) { }

  ngOnInit(): void {
    this.bdService.getMenu().subscribe(data => {
      this.todosdatos = data.map(e => {
        return {
          id: e.payload.doc.id,
          info: e.payload.doc.data()
        };
      });
    });
    this.bdService.getCodigos().subscribe(cod => {
      this.todoscodigos = cod.map(e => {
        return {
          id: e.payload.doc.id,
          info: e.payload.doc.data()
        };
      });
    });
  }
  agregar(uid: string) {
    for (const dato of this.todosdatos) {
      if (uid === dato.id) {
        this.platillo = {
          row: this.cont,
          id: dato.id,
          Nombre: dato.info.Nombre,
          Precio: dato.info.Precio
        };
        this.ordeno = true;
        this.total += this.platillo.Precio;
        this.carrito.push(this.platillo);
        this.cont++;
      }
    }
  }
  quitar(index: number) {
    const carritotemp = new Array();
    this.cont = 0;
    for (const dato of this.carrito) {
      if (dato.row === index) {
        this.total -= dato.Precio;
      } else {
        dato.cont = this.cont++;
        carritotemp.push(dato);
      }
    }
    this.carrito = carritotemp;
    // this.carrito.splice(index, 1);
  }
  ruleta() {
    const num = Math.floor(Math.random() * ((5 + 1) - 1 ) + 1);
    alert(num);
  }

}
