import { Router } from '@angular/router';
import { QRComponent } from './../qr/qr.component';
import { BdService } from './../../../services/bd/bd.service';
import { Component, OnInit, ViewChild, } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
  @ViewChild(QRComponent) qr: { codstr: string; };
  @ViewChild(QRComponent) qr2: {codval: number};
  codstr: string;
  codval: number;
  todosdatos: any;
  pedidos = new Array();
  miorden: any;
  carrito = new Array();
  tiroruleta = false;
  validi: string;
  platillo: {row: number, id: '', Nombre: '', Precio: 0, Vendido: number};
  cont = 0;
  total = 0.00;
  ordeno = false;
  validado = false;
  novalidado = false;
  totalprov = 0;
  constructor(private bdService: BdService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.bdService.getMenu().subscribe(data => {
      this.todosdatos = data.map(e => {
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
          Precio: dato.info.Precio,
          Vendido: dato.info.Vendidos
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
  tirar() {
    this.tiroruleta = true;
  }
  validar() {
    if (this.qr.codstr === this.validi) {
      this.totalprov = this.total;
      this.qr2.codval /= 100;
      const prov = 1 - this.qr2.codval;
      this.total *= prov;
      this.validado = true;
      this.novalidado = false;
    } else {
      this.novalidado = true;
    }
  }
  crearO() {

    const meses = new Array ('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
    'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');
    // tslint:disable-next-line: prefer-const
    let f = new Date();

    const orden = new Object();
    orden[this.carrito[0].Nombre] = 1;
    console.log(this.carrito);

    for (const vendido of this.carrito) {
      this.bdService.aumentarVenta(vendido.id, vendido.Vendido + 1);
    }
    for (const vendido of this.carrito) {
      for (const temp in orden) {
        if (vendido.Nombre === temp) {
          orden[temp]++;
        } else {
          orden[vendido.Nombre] = 1;
        }
      }

    }
    orden[this.carrito[0].Nombre]--;
    orden['Fecha'] = f.getDate() + ' de ' + meses[f.getMonth()] + ' de ' + f.getFullYear() + ', ' + f.getHours() + ':'
    + f.getMinutes() + ':' + f.getSeconds() + ' UTC-5';
    orden['Total'] = this.total;
    // orden["Usuario"]=this.

    this.authService.getUser().subscribe(usuario => {
      if (usuario.email == null) {
        orden['Usuario'] = usuario.phoneNumber;
      } else {
        orden['Usuario'] = usuario.email;
      }

      this.bdService.agregarOrden(orden);
      this.router.navigate(['mispedidos']);
  });

  }


}
