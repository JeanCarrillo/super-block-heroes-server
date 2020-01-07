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
  @WebSocketServer()
  server: Server;

  rooms = [
    {
      players: [],
      messages: [],
      game: {},
      started: false,
    },
  ];

  handleConnection(client: any) {
    console.log('new user connected: ' + client.id);
  }

  handleDisconnect(client: any) {
    console.log('a user disconnected: ' + client.id);
    const playerIndex = this.getPlayerIndex(client.id);
    this.rooms[0].players.splice(playerIndex, 1);
    console.log('rooms', this.rooms);
    this.emitRoom();
  }

  private getPlayerIndex(playerId: string): number {
    return this.rooms[0].players.findIndex(
      player => player.socketId === playerId,
    );
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

  private emitRoom() {
    this.server.emit('room', this.rooms[0]);
    console.log(this.rooms[0]);
  }

  @SubscribeMessage('join')
  handleJoin(
    @MessageBody() user: any,
    @ConnectedSocket() client: Socket,
  ): void {
    // TO DO : CREATE DIFFERENT ROOMS
    // const roomsIds = Object.keys(this.rooms);
    // if (!roomsIds.length) {
    //   this.createRoom(client);
    // }
    // for (const roomId of roomsIds) {
    //   if (this.rooms[roomId].players.length < 4) {
    //     this.joinRoom(roomId, client.id);
    //   }
    // }

    // Add socket id before storing user object
    user.socketId = client.id;
    // Clear confidential data if any
    if (user.email) {
      delete user.email;
    }
    if (user.id) {
      delete user.id;
    }
    if (user.password) {
      delete user.password;
    }
    this.rooms[0].players.push(user);
    this.emitRoom();
  }

  @SubscribeMessage('chat')
  handleChat(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ): void {
    console.log({ message });
    const playerIndex = this.getPlayerIndex(client.id);
    console.log({ playerIndex });
    this.rooms[0].messages.push({
      text: message,
      author: this.rooms[0].players[playerIndex].nickname,
    });
    this.emitRoom();
    // this.server.emit('messages', this.rooms[0].messages);
  }
}
