import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { FormsModule } from '@angular/forms';
import { SocketService } from './socket.service';
import { CesarService } from './cesar.service';
import { CryptoJsService } from './crypto.service';

const config: SocketIoConfig = { url: 'https://3000-gray-mollusk-1j6vhtbl.ws-eu07.gitpod.io/', options: {/*transport : ['websocket'], withCredentials:false*/} };

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    FormsModule
  ],
  providers: [SocketService, CesarService,CryptoJsService],
  bootstrap: [AppComponent]

})
export class AppModule { }
