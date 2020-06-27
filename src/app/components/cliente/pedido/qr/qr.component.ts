import { Component, Input} from '@angular/core';
@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.css']
})
export class QRComponent {
@Input() codstr:string;
@Input() codval:number;
  public qrdata: any = null;
  public elementType: "img" | "url" | "canvas" | "svg" = null;
  public scale: number = 1;

  constructor() {
    this.qrdata = "CODIGO DE DESCUENTO: "+this.codval+"DESC"+this.codstr;
    this.elementType = "img";
    this.scale = 4;
   }



}
