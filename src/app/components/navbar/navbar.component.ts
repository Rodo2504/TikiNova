import { NavloggedComponent } from './logged/navlogged/navlogged.component';
import { BdService } from './../../services/bd/bd.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public $user: Observable<any> = this.authService.afAuth.user;
  datos: any;
  useruid: any;
  constructor(private router: Router, private authService: AuthService, private auth: AngularFireAuth, private bdService: BdService) {  }
  ngOnInit(): void {
  }
  login() {
    this.router.navigate(['/login']);
  }
  register() {
    this.router.navigate(['/register']);
  }
  async onLogout() {
    try {
       await this.authService.logout();
       this.router.navigate(['/home']);
    } catch (error) {
      console.log(error);
    }
  }
}
