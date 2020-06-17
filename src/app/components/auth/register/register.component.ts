import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerform;
  igual = true;
  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.registerform = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      rpassword: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit(): void {
  }
  comparar() {
    const {email, password, rpassword} = this.registerform.value;
    if (password === rpassword) {
      this.igual = true;
    } else {
      this.igual = false;
    }
  }
  async onRegister() {
    const {email, password, rpassword} = this.registerform.value;
    try {
      const user = await this.authService.register(email, password);
      if (user) {
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.log(error);
    }
  }

}
