import { Component, OnInit } from '@angular/core';
import { EmailService } from '../../services/contactEmail/email.service';
@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  constructor(public emailservice:EmailService) { }
  sendto(email:string,subject:string,text:string){
    console.log("from:"+email ,subject+" te esta contactando.",text);
    this.emailservice.enviarRes(email,subject,text).subscribe((res)=>{
      console.log(res);
    }
    );

  }
  ngOnInit(): void {
    //hols
  }

}
