import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway()
export class EventsGateaway {
  @WebSocketServer()
  server;

  @SubscribeMessage('ping')
  handlePing(@MessageBody() data: unknown): void {
    this.server.emit('pong', data);
  }
}
