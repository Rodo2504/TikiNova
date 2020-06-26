import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { BdService } from 'src/app/services/bd/bd.service';

@Component({
  selector: 'app-navlogged',
  templateUrl: './navlogged.component.html',
  styleUrls: ['./navlogged.component.css']
})
export class NavloggedComponent implements OnInit {
  datos: any;
  useruid: any;
  isadmin = false;
  constructor(private router: Router, private authService: AuthService, private auth: AngularFireAuth, private bdService: BdService) {
    this.checar();
   }

  ngOnInit(): void {
  }
  checar() {
    this.bdService.isAdmin().subscribe(async data => {
      this.datos = data.map(e => {
        return{
          id: e.payload.doc.id,
          email: e.payload.doc.data()
        };
      });
      this.authService.getUser().subscribe(usuario => {
        this.useruid = usuario.uid.toString();
        for (const dato of this.datos) {
          if (dato.id === this.useruid) {
            this.isadmin = true;
          }
        }
      });
    });
  }

}
