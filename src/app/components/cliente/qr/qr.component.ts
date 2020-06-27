import { Component, Input, OnInit} from '@angular/core';
import { BdService } from './../../../services/bd/bd.service';
@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.css']
})
export class QRComponent implements OnInit{
  todoscodigos = new Array();
  codstr:string;
  codval:number;
  QRimage=false;
  public qrdata: any = "";
  public elementType: "img" | "url" | "canvas" | "svg" = null;
  public scale: number = 1;

  constructor(private bdService: BdService) {

   }
  ngOnInit(): void {
    this.bdService.getCodigos().subscribe(codigo => {

      // tslint:disable-next-line: align
     const code0 = {Codigo: codigo[0]._fieldsProto.Codigo.stringValue, Estado: codigo[0]._fieldsProto.Estado.booleanValue,
       Valor: codigo[0]._fieldsProto.Valor.integerValue};
     this.todoscodigos.push(code0);
   ///  console.log(code0);

     const code1 = {Codigo: codigo[1]._fieldsProto.Codigo.stringValue, Estado: codigo[1]._fieldsProto.Estado.booleanValue,
       Valor: codigo[1]._fieldsProto.Valor.integerValue};
     this.todoscodigos.push(code1);
   //  console.log(code1);

     const code2 = {Codigo: codigo[2]._fieldsProto.Codigo.stringValue, Estado: codigo[2]._fieldsProto.Estado.booleanValue,
       Valor: codigo[2]._fieldsProto.Valor.integerValue};
     this.todoscodigos.push(code2);
   //  console.log(code2);

     const code3 = {Codigo: codigo[3]._fieldsProto.Codigo.stringValue, Estado: codigo[3]._fieldsProto.Estado.booleanValue,
       Valor: codigo[3]._fieldsProto.Valor.integerValue};
     this.todoscodigos.push(code3);
   //  console.log(code3);

     const code4 = {Codigo: codigo[4]._fieldsProto.Codigo.stringValue, Estado: codigo[4]._fieldsProto.Estado.booleanValue,
       Valor: codigo[4]._fieldsProto.Valor.integerValue};
     this.todoscodigos.push(code4);
   //  console.log(code4);
   this.ruleta();
   });

  }
  ruleta() {
    const num = Math.floor(Math.random() * ((5 + 1) - 1 ) + 1);
    console.log(num);
    console.log(this.todoscodigos[num].Valor);
    console.log(this.todoscodigos[num].Codigo);
    this.codval = this.todoscodigos[num].Valor;
    this.codstr = this.todoscodigos[num].Codigo;
    this.QR(this.codstr,this.codval);
  }


   QR(codstr:string,codval:number){
    this.qrdata = "CODIGO DE DESCUENTO: "+codval+"DESC"+codstr;
    this.elementType = "img";
    this.scale = 4;
    this.QRimage=true;
   }


}
