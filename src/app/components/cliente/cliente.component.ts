import { AuthService } from './../../services/auth/auth.service';
import { BdService } from './../../services/bd/bd.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  todosordenes: any;
  valores = '';
  usuarioactual: string;
  contiene = false;

  constructor(private bdService: BdService, private authService: AuthService) { }

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.bdService.getOrdenes().subscribe(data => {
      this.todosordenes = data.map(e => {
        return {
          id: e.payload.doc.id,
          info: e.payload.doc.data()
        };
      });
      console.log(this.todosordenes);
      this.authService.getUser().subscribe(usuario => {
        if (usuario.email == null) {
          this.usuarioactual = usuario.phoneNumber;
        } else {
          this.usuarioactual = usuario.email;
        }
        for (const prueba of this.todosordenes) {
          const objeto = prueba.info;
          if (this.usuarioactual === prueba.info.Usuario) {
            this.contiene = true;
            this.valores += '<div class="card cards"><div class="card-body">';
          // tslint:disable-next-line: forin
            for (const prueba2 in objeto) {
              this.valores += `<p class="card-text">${prueba2}: ${objeto[prueba2]}</p>`;
            }
            this.valores += '</div></div>';
          }
        }
      });
    });
  }

}
