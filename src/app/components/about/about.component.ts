import { Component, OnInit } from '@angular/core';
import Speech from 'speak-tts';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  html = '';
  speechAbout: any;
  speechData: any;
  constructor(){
    this.speechAbout = new Speech() // will throw an exception if not browser supported
    if(this.speechAbout .hasBrowserSupport()) { // returns a boolean
        console.log("speech synthesis supported")
        this.speechAbout.init({
                'volume': 1,
                'lang': 'es-MX',
                'rate': 1,
                'pitch': 1,
                'voice':'Microsoft Sabina Desktop - Spanish (Mexico)',
                'splitSentences': true,
                'listeners': {
                    'onvoiceschanged': (voices) => {
                        console.log("Event voiceschanged", voices)
                    }
                }
        }).then((data) => {
            // The "data" object contains the list of available voices and the voice synthesis params
            console.log("Speech is ready, voices are available", data)
            this.speechData = data;
            data.voices.forEach(voice => {
            console.log(voice.name + " "+ voice.lang)
            });
        }).catch(e => {
            console.error("An error occured while initializing : ", e)
        })
    }

  }


  start(texto1:string,texto2:string,texto3:string,texto4:string){

    this.html = texto1+texto2+texto3+texto4;
    //console.log(texto);


      this.speechAbout.speak({
          text: this.html,
      }).then(() => {
          console.log("Success !")
      }).catch(e => {
          console.error("An error occurred :", e)
      })
  }
  pause(){
    this.speechAbout.pause();
  }
  resume(){
    this.speechAbout.resume();
  }



}



