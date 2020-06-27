import { BdService } from './../../../services/bd/bd.service';
import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
  codstr:string;
  codval:number;
  todosdatos: any;
  pedidos = new Array()
  miorden: any;
  carrito = new Array();
  platillo: {row: number, id: '', Nombre: '', Precio: 0, Vendido: number};
  cont = 0;
  total = 0.00;
  ordeno = false;
  constructor(private bdService: BdService, private authService: AuthService) { }

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
  crearO(){

    var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    var f=new Date();

    var orden = new Object();
    orden[this.carrito[0].Nombre]=1;
    console.log(this.carrito);

    for(let vendido of this.carrito){
      this.bdService.aumentarVenta(vendido.id,vendido.Vendido+1);
    }
    for(let vendido of this.carrito){
      for(var temp in orden){
        if(vendido.Nombre==temp){
          orden[temp]++;
        }else{
          orden[vendido.Nombre]=1;
        }
      }

    }
    orden[this.carrito[0].Nombre]--;
    orden["Fecha"]= f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear()+", "+f.getHours()+':'+f.getMinutes()+':'+f.getSeconds()+" UTC-5";
    orden["Total"]=this.total;
    //orden["Usuario"]=this.

    this.authService.getUser().subscribe(usuario => {
      if(usuario.email==null){
        orden["Usuario"] = usuario.phoneNumber;
      }else{
        orden["Usuario"]=usuario.email;
      }



  });
    this.bdService.agregarOrden(orden);
  }


}
