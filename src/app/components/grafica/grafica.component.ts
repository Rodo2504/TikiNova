import { Component, OnInit } from '@angular/core';
import { BdService } from 'src/app/services/bd/bd.service';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit{
  labels = new Array();
  todosdatos: any;
  mostrar = false;
  chartdata= new Array();
  constructor(private bdservice:BdService) { }
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true

  };
  public barChartLabels: string[] = [];
  public barChartType: string = 'bar';
  public barChartLegend = true;
  public barChartData: any[] = [
    { data: [], label: 'Vendidos' },
  ];


  ngOnInit(): void {
    this.bdservice.getMenu().subscribe(data => {
      this.todosdatos = data.map(e => {
        return {
          id: e.payload.doc.id,
          info: e.payload.doc.data()
        };
      });
      for(let nom of this.todosdatos){
        this.labels.push(nom.info.Nombre);
        this.chartdata.push(nom.info.Vendidos);
      }
    });


  }
    crearGraf(){
      this.barChartLabels = this.labels;
      this.barChartData[0].data = this.chartdata;
      this.mostrar = true;
    }
}
