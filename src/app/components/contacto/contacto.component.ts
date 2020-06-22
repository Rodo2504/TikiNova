import { Component, OnInit } from '@angular/core';
import { EmailService } from '../../services/contactEmail/email.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  enviadoStatus:any;
  contactForm;
  constructor(public emailservice:EmailService,private formB: FormBuilder) {
    this.contactForm = this.formB.group({
      nom: [''],
      correo: ['', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      msj: ['']
   });
  }
  sendto(email:string,subject:string,text:string){
    console.log("from:"+email ,subject+" te esta contactando.",text);
    this.contactForm.reset()
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
