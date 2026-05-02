import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private client: Client = new Client();
  private subject: Subject<any> = new Subject();

  connect(cartId: string): Observable<any> {
    // tear down any previous connection
    this.subject?.complete();
    this.subject = new Subject<any>();

    this.client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      debug: (msg) => console.log('[STOMP]', msg), // ← add this to see handshake logs
      onConnect: () => {
        console.log('[STOMP] connected, subscribing to cartId:', cartId);
        this.client.subscribe(`/topic/payment/${cartId}`, (message: IMessage) => {
          console.log('[STOMP] raw message:', message.body);
          this.subject.next(JSON.parse(message.body));
        });
      },
      onDisconnect: () => {
        console.log('[STOMP] disconnected');
        this.subject.complete();
      },
      onStompError: (frame) => {
        console.error('[STOMP] error', frame);
        this.subject.error(frame);
      },
    });

    this.client.activate();
    return this.subject.asObservable();
  }

  disconnect(): void {
    this.subject?.complete();
    if (this.client?.active) {
      this.client.deactivate();
    }
  }
}
