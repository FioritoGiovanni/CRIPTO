import { Component, OnInit } from '@angular/core';
import { SocketService } from './socket.service';
import { Observable } from 'rxjs';
import { CesarService } from './cesar.service';
import { CryptoJsService } from './crypto.service';
import {FormData} from './form.data.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  messageList:  FormData[] = [];
  obs: Observable<Object>;
  chiave1:string;
  message:string;
  chiaveD: string;
  t :String[]= [];
  user:string;


  constructor(private socketService: SocketService,private cesarService : CesarService,private cryptoJsService:CryptoJsService) {
       var lettere  = "ABCDEFGHILMNOPQRSTUVZ1234567890abcdefghilmnopqrstuvz"

    for (var i = 0 ; i < 5;i++) {
        this.t.push(lettere.charAt(Math.floor(Math.random() * lettere.length)))
    }
    this.chiaveD = this.t.join('')
  }
 sendMessage(formData: FormData) {
    console.log("form input: " + JSON.stringify(formData));


    let encoded: FormData = formData; //Preparo una variabile da criptare
      //Se il tipo di messaggio è t-des allora cripto con cryptoService.encodeDes
        encoded.message = this.cryptoJsService.encodeDes(formData.message, this.chiaveD );

    console.log(encoded);
    //Invio il messaggio cifrato
    this.socketService.sendMessage(JSON.stringify(encoded));


 }



  ngOnInit()
  {
      this.obs = this.socketService.getMessage();
      this.obs.subscribe(this.decodeData);
      this.socketService.getNewClient().subscribe(this.getNewClient)
      this.socketService.getKey().subscribe(this.getNewKey)
  }

  decodeData = (messageData: string) => {
      let received: FormData = JSON.parse(messageData);

      console.log("messagereceived: " + JSON.stringify(received))
      received.message = this.cryptoJsService.decodeDes(received.message, this.chiaveD);
      this.messageList.push( received);
      }

  getNewClient = (message:string) => {
    console.log(message);

  }
  getNewKey = (key:string)=> {
    this.chiaveD = key ;
    console.log(this.chiaveD)
  }
  sendKey(){
    this.socketService.sendKey(this.chiaveD)
  }
}




