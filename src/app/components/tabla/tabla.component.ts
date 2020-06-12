import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  puntuacion: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Las Alitas', puntuacion: 4.9},
  {position: 2, name: 'Las Costillas', puntuacion: 4.7},
  {position: 3, name: 'TikiNova', puntuacion: 4.3},
  {position: 4, name: 'La Estación', puntuacion: 4.1},
  {position: 5, name: 'La Mestiza', puntuacion: 3.8}
];

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent{

  displayedColumns: string[] = ['position', 'name', 'weight'];
  dataSource = ELEMENT_DATA;
}
