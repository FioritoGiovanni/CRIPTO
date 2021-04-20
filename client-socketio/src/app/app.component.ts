import { Component } from '@angular/core';
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
export class AppComponent {
  messageList:  string[] = [];
  obs: Observable<Object>;
  chiave1:string;
  message:string;



  constructor(private socketService: SocketService,private cesarService : CesarService,private cryptoJsService:CryptoJsService) {
  }
setEncryptionKey(chiave :HTMLInputElement){
  this.chiave1 = chiave.value;
}

 sendMessage(formData: FormData) {
    console.log("form input: " + JSON.stringify(formData));

    let encoded: FormData = formData; //Preparo una variabile da criptare
    switch (formData.messageType) {
      //Se il tipo di messaggio è cesar allora cripto con cesarService
      case "cesar":
        console.log(this.chiave1);
        encoded.message = this.cesarService.encode(formData.message, Number(this.chiave1));
        break;
      //Se il tipo di messaggio è t-des allora cripto con cryptoService.encodeDes
      case "t-des":
        encoded.message = this.cryptoJsService.encodeDes(formData.message, this.chiave1);
        break;
    }
    console.log(encoded);
    //Invio il messaggio cifrato
    this.socketService.sendMessage(JSON.stringify(encoded));

    this.message = "";
  }



ngOnInit() {
    this.obs = this.socketService.getMessage();
    this.obs.subscribe(this.decodeData);
  }

  decodeData = (messageData: string) => {
    let received: FormData = JSON.parse(messageData);
    console.log("messagereceived: " + JSON.stringify(received))

    switch (received.messageType) {
      case "cesar":
        received.message = this.cesarService.decode(received.message, Number(this.chiave1));
        break;

      case "t-des":
        received.message = this.cryptoJsService.decodeDes(received.message, this.chiave1);
        break;
    }

    this.messageList.push("messaggio cifrato: " + messageData + " messaggio decifrato " + JSON.stringify(received));

  }


}
