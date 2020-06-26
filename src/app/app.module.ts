import { BdService } from './services/bd/bd.service';
import { AuthService } from './services/auth/auth.service';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { QRComponent } from './components/qr/qr.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavloggedComponent } from './components/navbar/logged/navlogged/navlogged.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { PreguntasComponent } from './components/preguntas/preguntas.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { ClienteComponent } from './components/cliente/cliente.component';



/* Componentes Angular Material */
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { HttpClientModule } from '@angular/common/http';
import { QRCodeModule } from 'angularx-qrcode';
import { MenuComponent } from './components/admin/menu/menu.component';
import { PedidoComponent } from './components/cliente/pedido/pedido.component';
import { GraficaComponent } from './components/grafica/grafica.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactoComponent,
    PreguntasComponent,
    TablaComponent,
    LoginComponent,
    RegisterComponent,
    QRComponent,
    NavloggedComponent,
    AdminComponent,
    ClienteComponent,
    MenuComponent,
    PedidoComponent,
    GraficaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatExpansionModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatRadioModule,
    MatCheckboxModule,
    MatInputModule,
    MatTabsModule,
    HttpClientModule,
    QRCodeModule,
    ChartsModule
  ],
  providers: [AuthService, BdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
