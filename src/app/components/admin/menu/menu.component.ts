import { BdService } from 'src/app/services/bd/bd.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuForm;
  todosdatos: any;
  editando = false;
  nomi: string;
  descripi: string;
  preci: number;
  idu: string; // es para agrrar el uid del producto a update
  constructor(private bdService: BdService, private formBuilder: FormBuilder) {
    this.menuForm = this.formBuilder.group({
      nomi: ['', Validators.required],
      descripi: ['', Validators.required],
      preci: ['', Validators.required],
    });
   }

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
  edit(id: string) {
    for (const dato of this.todosdatos) {
      if (dato.id === id) {
        this.nomi = dato.info.Nombre;
        this.descripi = dato.info.Descripcion;
        this.preci = dato.info.Precio;
        this.editando = true;
        this.idu = id;
      }
    }
  }
  agregar() {
    const datoc = { Nombre: this.nomi, Descripcion: this.descripi, Precio: this.preci  };
    if (!this.editando) {
      this.bdService.createMenu(datoc);
      this.limpiar();
    } else {
      this.bdService.updateMenu(datoc, this.idu);
      this.limpiar();
    }
  }
  borrar(id: string) {
    this.bdService.borrarMenu(id);
  }
  limpiar() {
    this.nomi = '';
    this.descripi = '';
    this.preci = 0.00;
    this.editando = false;
  }

}
