import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm;
  invalido: boolean;
  smsForm ;
  captcha: any;
  resultado: any;
  error = '';
  enviado = false;
  enviando = false;
  enviadoerr: boolean;
  error2 = '';
  constructor(private authService: AuthService, private router: Router, private auth: AngularFireAuth, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(4)]]});
    this.smsForm = this.formBuilder.group({
        telefono: ['', [
          Validators.required,
          Validators.pattern('^((\\+91-?)|0)?[0-9]{12}$')]],
        codigo: ['', [Validators.required, Validators.minLength(1)]]});
   }

  ngOnInit(): void {
    this.captcha = new firebase.auth.RecaptchaVerifier('captcha', {
      size: 'invisible'
    });
    this.captcha.render();
  }
  async onLogin() {
    const {email, password} = this.loginForm.value;
    try {
      const user = await this.authService.login(email, password);
      if (user) {
        this.invalido = false;
        this.router.navigate(['/home']);
        // tslint:disable-next-line: no-shadowed-variable
      } else {
        this.invalido = true;
        this.error = 'No coincide la contraseña con el usuario';
      }
    } catch (error) {
      console.log(error);
    }
  }
  enviar() {
    let {telefono} = this.smsForm.value;
    telefono = '+' + telefono;
    firebase.auth().signInWithPhoneNumber(telefono, this.captcha)
    .then((resultado) => {
      console.log('Enviado el sms');
      this.enviado = true;
      this.enviando = false;
      this.resultado = resultado;
    }).catch((error) => {
      console.log(error);
    });
    this.enviando = true;
  }
  entrar() {
    const {telefono, codigo} = this.smsForm.value;
    this.resultado.confirm(codigo).then(() => {
      console.log('Te logueste muchas gracias');
      console.log(this.resultado);
      this.router.navigate(['/home']);
    }).catch((error) => {
      this.enviadoerr = true;
      this.error2 = 'Ingresa el codigo correcto o reenvia el mensaje';
      console.log(error);
    });
  }
}
