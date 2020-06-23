import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent {
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true

  };
  public barChartLabels: string[] = ['Las Alitas', 'Las Costillas', 'TikiNova', 'La Estación', 'La Mestiza'];
  public barChartType: string = 'polarArea';
  public barChartLegend = true;
  public barChartData: any[] = [
    { data: [4.9, 4.7, 4.3, 4.1, 3.8], label: 'Puntuaciones' },


  ];


}
