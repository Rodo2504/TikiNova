import { BdService } from 'src/app/services/bd/bd.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  todosdatos: any;
  todosordenes: any;
  valores = '';
  uno = false;
  constructor(private bdService: BdService) { }

  ngOnInit(): void {
    this.bdService.getOrdenes().subscribe(data => {
      this.todosordenes = data.map(e => {
        return {
          id: e.payload.doc.id,
          info: e.payload.doc.data()
        };
      });
      for (let prueba of this.todosordenes) {
        const objeto = prueba.info;
        this.valores += '<div class="card"><div class="card-body">';
        // tslint:disable-next-line: forin
        for (let prueba2 in objeto) {
          this.uno = true;
          this.valores += `<p class="card-text">${prueba2}: ${objeto[prueba2]}</p>`;
        }
        this.valores += '</div></div>';
      }
    });
  }

}
