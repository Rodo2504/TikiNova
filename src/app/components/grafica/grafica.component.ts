import { Component, OnInit } from '@angular/core';
import { BdService } from 'src/app/services/bd/bd.service';

import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit{

  todosLabels = new Array();
  todosdatos: any;
  mostrar = false;
  checkForm: FormGroup;

  todosChartdata= new Array();
  labelTemp = new Array();
  dataTemp = new Array();


  constructor(private bdservice:BdService, private formBuilder: FormBuilder) {


   }
  public barChartOptions:any = {
    scaleShowVerticalLines: true,
    responsive: true

  };
  public barChartLabels: string[] = [];
  public barChartType: string = 'bar';
  public barChartLegend = true;
  public barChartData: any[] = [
    { data: [], label: 'Vendidos' },
  ];
  public chartColors: Array<any> = [
    { // all colors in order
      backgroundColor: '#202b6b'
    }
]


  ngOnInit(): void {
    this.bdservice.getMenu().subscribe(data => {
      this.todosdatos = data.map(e => {
        return {
          id: e.payload.doc.id,
          info: e.payload.doc.data()
        };
      });
      for(let nom of this.todosdatos){

        this.todosLabels.push(nom.info.Nombre);
        this.todosChartdata.push(nom.info.Vendidos);
      }
    });
    this.checkForm = this.formBuilder.group({
      checkArray: this.formBuilder.array([], [Validators.required])
    })

  }
    crearGraf(){
      this.barChartLabels = this.todosLabels;

      this.barChartData[0].data = this.todosChartdata;

      this.mostrar = true;

    }
    filtro() {
      this.barChartLabels = this.labelTemp;
      this.barChartData[0].data = this.dataTemp;



    }
    onCheckboxChange(e) {
      const checkArray: FormArray = this.checkForm.get('checkArray') as FormArray;
      let index:any;
      if (e.target.checked) {
        checkArray.push(new FormControl(e.target.value));
        index = this.todosLabels.findIndex(label => label === e.target.value);
        this.labelTemp.push(e.target.value);
        this.dataTemp.push(this.todosChartdata[index]);
      } else {
        let i: number = 0;
        checkArray.controls.forEach((item: FormControl) => {
          if (item.value == e.target.value) {
            checkArray.removeAt(i);
            this.labelTemp.splice(i,1);
            this.dataTemp.splice(i,1);
            return;
          }
          i++;
        });
      }
      this.filtro();
    }
}
