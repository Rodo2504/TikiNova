import { Component, OnInit } from '@angular/core';
import { EmailService } from '../../services/contactEmail/email.service';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  enviadoStatus:any;

  constructor(public emailservice:EmailService) { }
  sendto(email:string,subject:string,text:string){
    console.log("from:"+email ,subject+" te esta contactando.",text);
    this.emailservice.enviarRes(email,subject,text).subscribe((res)=>{
      console.log(res);

      this.enviadoStatus=true;
      console.log("Enviado:"+this.enviadoStatus);

    }
    );

  }

  ngOnInit(): void {
    this.enviadoStatus = false;
    console.log("Enviado:"+this.enviadoStatus);
  }

}
