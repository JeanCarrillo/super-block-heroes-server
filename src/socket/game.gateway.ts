import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  rooms = [
    {
      players: [],
    },
  ];
  @WebSocketServer()
  server: Server;

  handleConnection(client: any) {
    console.log({ client });
    console.log('new user connected: ' + client.id);
  }

  handleDisconnect(client: any) {
    console.log('a user disconnected: ' + client.id);
  }

  // private createRoom(client: any): void {
  //   this.rooms[client.id] = {
  //     players: [client.id],
  //   };
  // }

  // private deleteRoom(hostId: string): void {
  //   delete this.rooms[hostId];
  // }

  // private joinRoom(roomId: string, client: any): void {
  //   this.rooms[roomId].players.push(client.id);
  // }

  // private leaveRoom(roomId: string, client: any): void {
  //   const playerIndex = this.rooms[roomId].indexOf(client.id);
  //   this.rooms[roomId].splice(playerIndex, 1);
  // }

  @SubscribeMessage('join')
  handleJoin(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): void {
    // const roomsIds = Object.keys(this.rooms);
    // if (!roomsIds.length) {
    //   this.createRoom(client);
    // }
    // for (const roomId of roomsIds) {
    //   if (this.rooms[roomId].players.length < 4) {
    //     this.joinRoom(roomId, client.id);
    //   }
    // }
    this.rooms[0].players.push(client.id);
    console.log({ data });
    console.log(this.rooms);
    // this.server.emit('message', 'server response');
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): void {
    console.log({ data });
    this.server.emit('message', 'server response');
  }
}
