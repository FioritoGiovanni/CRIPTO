import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable()
export class SocketService {

    constructor(private socket: Socket) { }

    sendMessage(msg: string){
        this.socket.emit("new-message", msg);
    }
    sendKey (msg:string){
      this.socket.emit("new-key",msg);
    }
     getMessage() {
         return this.socket
             .fromEvent("resp-message")
             .pipe(map((data) => data));
    }
      getKey() {
         return this.socket
             .fromEvent("new-key")
             .pipe(map((data) => data));
    }
      getNewClient() {
         return this.socket
             .fromEvent("new-client")
             .pipe(map((data) => data));
    }

}
