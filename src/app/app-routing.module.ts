import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreguntasComponent } from './components/preguntas/preguntas.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'preguntas', component: PreguntasComponent },
  {path: '**',pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
