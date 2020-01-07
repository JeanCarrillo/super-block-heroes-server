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
      monster: {},
      game: {
        players: [],
        victory: false,
        defeat: false,
      },
      started: false,
    },
  ];

  handleConnection(client: any) {
    console.log('new user connected: ' + client.id);
  }

  handleDisconnect(client: any) {
    console.log('a user disconnected: ' + client.id);
    for (const player of this.rooms[0].players) {
      const playerIndex = this.getPlayerIndex(client.id);
      if (playerIndex !== -1) {
        this.rooms[0].players.splice(playerIndex, 1);
        this.rooms[0].game.players.splice(playerIndex, 1);
      }
    }
    if (!this.rooms[0].players.length) {
      this.rooms[0].started = false;
    }
    console.log('rooms', this.rooms);
    this.emitRoom();
  }

  private getPlayerIndex(playerId: string): number {
    return this.rooms[0].players.findIndex(
      player => player.socketId === playerId,
    );
  }

  private emitRoom() {
    this.server.emit('room', this.rooms[0]);
    console.log(this.rooms[0]);
  }

  private emitGame() {
    this.server.emit('game', this.rooms[0].game);
  }

  // private emitPlayer(data: any) {
  //   this.server.emit('player', {
  //     index: playerIndex,
  //     data: this.rooms[0].players[playerIndex],
  //   });
  // }

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
    this.rooms[0].game.players.push({});
    this.emitRoom();
  }

  @SubscribeMessage('chat')
  handleChat(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ): void {
    const playerIndex = this.getPlayerIndex(client.id);
    this.rooms[0].messages.push({
      text: message,
      author: this.rooms[0].players[playerIndex].nickname,
    });
    this.emitRoom();
    // this.server.emit('messages', this.rooms[0].messages);
  }

  @SubscribeMessage('start')
  handleStart(@MessageBody() monster: any): void {
    this.rooms[0].started = true;
    this.rooms[0].monster = monster;
    this.emitRoom();
    // this.server.emit('messages', this.rooms[0].messages);
  }

  @SubscribeMessage('gameEvent')
  handleGameEvent(
    @MessageBody() event: any,
    @ConnectedSocket() client: Socket,
  ): void {
    console.log({ event });
    this.rooms[0].game.players[event.playerIndex][event.eventType] =
      event[event.eventType];
    if (event.eventType === 'useCapacity') {
      this.server.emit('gameEvent', event);
    } else {
      client.broadcast.emit('gameEvent', event);
    }
  }
}
