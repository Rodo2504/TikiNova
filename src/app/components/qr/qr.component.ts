import { Component} from '@angular/core';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.css']
})
export class QRComponent {

  public qrdata: string = null;
  public elementType: "img" | "url" | "canvas" | "svg" = null;
  public scale: number = 1;

  constructor() {
    this.qrdata = "CODIGO DE DESCUENTO: 30DESC";
    this.elementType = "img";
    this.scale = 4;
   }



}
