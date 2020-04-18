import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  texto = '';
  mensajesSubcripcion: Subscription;
  mensajes: any[] = [];
  elemento: HTMLElement;

  constructor(
    public chatService: ChatService
  ) { }

  ngOnInit() {
    this.elemento = document.getElementById('chatMensaje');
    this.mensajesSubcripcion = this.chatService.getMessage().subscribe( msg => {
      
      this.mensajes.push(msg);

      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      },50);

    });
  }

  ngOnDestroy(){
    this.mensajesSubcripcion.unsubscribe();
  }

  enviar(){

    this.chatService.sendMessage(this.texto);
    this.texto = '';
  }

}
