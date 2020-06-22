import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';

const BASE_API_URL = 'https://us-central1-tikinova-a9918.cloudfunctions.net/';
//const BASE_API_URL = 'http://localhost:5000/fir-y-nodemailer/us-central1/';
//const BASE_API_URL = '/tikinova-a9918/us-central1/';



@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(public http:HttpClient) { }

  enviarRes(email,subject,text){
    const body = new HttpParams()
      .set('email', email)
      .set('subject', subject)
      .set('message', text);
    return this.http.post(BASE_API_URL+'mailer', body.toString(),{
      headers: new HttpHeaders().set( 'Content-Type', 'application/x-www-form-urlencoded' ) });
  }
}
