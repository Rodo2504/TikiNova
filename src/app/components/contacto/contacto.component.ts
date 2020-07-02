import { Component, OnInit } from '@angular/core';
import { EmailService } from '../../services/contactEmail/email.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  enviadoStatus: any;
  contactForm;
  enviando = false;
  asuntos:string[]=["Soporte Tecnico","Ayuda","Interes Personal", "Retroalimentacion", "Cuenta", "Otro"];
  seleccionado:any;
  constructor(public emailservice:EmailService,private formB: FormBuilder) {
    this.contactForm = this.formB.group({
      nom: [''],
      select: [''],
      correo: ['', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      msj: ['']
   });
  }
  sendto(email:string,subject:string,text:string){

    subject= subject+" te esta contactando. Acerca de "+this.seleccionado;
    this.contactForm.reset()
    this.emailservice.enviarRes(email,subject,text).subscribe((res)=>{

      this.enviando = false;
      this.enviadoStatus=true;


    }
    );
    this.enviando = true;
  }

  ngOnInit(): void {
    this.enviadoStatus = false;

  }

}
