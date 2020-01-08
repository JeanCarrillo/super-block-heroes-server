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
import { clearSensibleData } from './functions';

const RoomModel = {
  players: [],
  messages: [],
  monster: {},
  started: false,
};

@WebSocketGateway()
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  playersRoomsIds: any = {};
  rooms: any = {};

  handleConnection(client: any) {
    console.log('new user connected: ' + client.id);
  }

  handleDisconnect(client: any) {
    console.log('a user disconnected: ' + client.id);
    const room = this.playersRoomsIds[client.id];
    console.log({ room });
    if (!room) {
      return;
    }
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.rooms[room].players.length; i += 1) {
      const playerIndex = this.getPlayerIndex(client.id, room);
      if (playerIndex !== -1) {
        this.rooms[room].players.splice(playerIndex, 1);
        break;
      }
    }
    if (!this.rooms[room].players.length) {
      delete this.rooms[room];
    }
    if (this.playersRoomsIds[client.id]) {
      delete this.playersRoomsIds[client.id];
    }
    if (this.rooms[room]) {
      this.emitRoom(room);
    }
    console.log('rooms', this.rooms);
  }

  private getPlayerIndex(playerId: string, room: string): number {
    return this.rooms[room].players.findIndex(
      player => player.socketId === playerId,
    );
  }

  // Emits the room object to all users in this room
  private emitRoom(room: string) {
    this.server.to(room).emit('room', this.rooms[room]);
  }

  @SubscribeMessage('join')
  handleJoin(
    @MessageBody() user: any,
    @ConnectedSocket() client: Socket,
  ): void {
    // Add socket id before storing user object
    user.socketId = client.id;
    // Clear confidential data if any
    user = clearSensibleData(user);
    const roomsKeys = Object.keys(this.rooms);
    if (!roomsKeys.length) {
      this.rooms['0'] = RoomModel;
    }
    let roomToJoin = null;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < roomsKeys.length; i += 1) {
      if (
        this.rooms[roomsKeys[i]] &&
        this.rooms[roomsKeys[i]].players.length < 4 &&
        !this.rooms[roomsKeys[i]].started
      ) {
        roomToJoin = roomsKeys[i];
        break;
      }
    }
    if (!roomToJoin) {
      roomToJoin = roomsKeys.length;
      this.rooms[roomToJoin] = RoomModel;
    }
    const room = roomToJoin.toString();
    this.playersRoomsIds[client.id] = room;
    const playerIndex = this.getPlayerIndex(client.id, room);
    console.log({ playerIndex });
    if (playerIndex === -1) {
      this.rooms[room].players.push(user);
    }
    client.join(room);
    this.emitRoom(room);
  }

  @SubscribeMessage('chat')
  handleChat(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ): void {
    const room = this.playersRoomsIds[client.id];
    const playerIndex = this.getPlayerIndex(client.id, room);
    this.rooms[room].messages.push({
      text: message,
      author: this.rooms[room].players[playerIndex].nickname,
    });
    this.emitRoom(room);
  }

  @SubscribeMessage('start')
  handleStart(
    @MessageBody() monster: any,
    @ConnectedSocket() client: Socket,
  ): void {
    const room = this.playersRoomsIds[client.id];
    this.rooms[room].started = true;
    this.rooms[room].monster = monster;
    this.emitRoom(room);
  }

  @SubscribeMessage('gameEvent')
  handleGameEvent(
    @MessageBody() event: any,
    @ConnectedSocket() client: Socket,
  ): void {
    const room = this.playersRoomsIds[client.id];
    if (event.eventType === 'useCapacity') {
      this.server.to(room).emit('gameEvent', event);
    } else {
      client.to(room).broadcast.emit('gameEvent', event);
    }
  }
}
