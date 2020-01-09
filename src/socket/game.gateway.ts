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
    this.leaveRoom(client);
  }

  // Triggered when a player goes to main menu : leave current room
  @SubscribeMessage('mainMenu')
  handleMainMenu(@ConnectedSocket() client: Socket): void {
    const roomId = this.playersRoomsIds[client.id];
    client.leave(roomId);
    this.leaveRoom(client);
  }

  private leaveRoom(client: any) {
    const roomId = this.playersRoomsIds[client.id];
    if (!roomId) {
      return;
    }
    console.log({ roomId });
    // tslint:disable-next-line: prefer-for-of
    const playerIndex = this.getPlayerIndex(client.id, roomId);
    if (playerIndex !== -1) {
      this.rooms[roomId].players.splice(playerIndex, 1);
    }
    if (!this.rooms[roomId].players.length) {
      delete this.rooms[roomId];
    }
    if (this.playersRoomsIds[client.id]) {
      delete this.playersRoomsIds[client.id];
    }
    if (this.rooms[roomId]) {
      this.emitRoom(roomId);
    }
    console.log('rooms', this.rooms);
  }

  private getPlayerIndex(playerId: string, roomId: string): number {
    return this.rooms[roomId].players.findIndex(
      player => player.socketId === playerId,
    );
  }

  // Emits the room object to all users in this room
  private emitRoom(roomId: string) {
    this.server.to(roomId).emit('room', this.rooms[roomId]);
  }

  private createRoom(): string {
    let created = false;
    let counter = 0;
    let roomId;
    while (!created) {
      if (!this.rooms[counter]) {
        console.log('create room');
        console.log(this.rooms);
        console.log({ counter });
        this.rooms[counter] = RoomModel;
        roomId = counter.toString();
        created = true;
        break;
      } else {
        counter += 1;
      }
    }
    return roomId;
  }

  @SubscribeMessage('join')
  handleJoin(
    @MessageBody() user: any,
    @ConnectedSocket() client: Socket,
  ): void {
    const currentRoomId = this.playersRoomsIds[client.id];
    if (currentRoomId) {
      // console.log(this.rooms[currentRoomId]);
      // delete this.playersRoomsIds[client.id];
      return;
    }
    // Add socket id before storing user object
    user.socketId = client.id;
    // Clear confidential data if any
    user = clearSensibleData(user);

    let roomsKeys = Object.keys(this.rooms);
    let roomIdToJoin = null;

    // If no room, create one
    if (roomsKeys.length === 0) {
      this.createRoom();
      roomsKeys = Object.keys(this.rooms);
    }
    console.log({ roomsKeys });

    // Look in all rooms until it finds a room with less than 4 players where the game isn't started yet
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < roomsKeys.length; i += 1) {
      if (
        this.rooms[roomsKeys[i]].players.length < 4 &&
        !this.rooms[roomsKeys[i]].started
      ) {
        roomIdToJoin = roomsKeys[i];
        break;
      }
    }
    // If we didn't find any room that matches, create one
    if (!roomIdToJoin) {
      roomIdToJoin = this.createRoom();
    }
    // Register room ID in playersRoomsIds
    this.playersRoomsIds[client.id] = roomIdToJoin;

    // If player is NOT already in the room, push him into the room object
    const playerIndex = this.getPlayerIndex(client.id, roomIdToJoin);
    if (playerIndex === -1) {
      this.rooms[roomIdToJoin].players.push(user);
    }

    client.join(roomIdToJoin);
    this.emitRoom(roomIdToJoin);
  }

  @SubscribeMessage('chat')
  handleChat(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ): void {
    const roomId = this.playersRoomsIds[client.id];
    const playerIndex = this.getPlayerIndex(client.id, roomId);
    this.rooms[roomId].messages.push({
      text: message,
      author: this.rooms[roomId].players[playerIndex].nickname,
    });
    this.emitRoom(roomId);
  }

  @SubscribeMessage('start')
  handleStart(
    @MessageBody() monster: any,
    @ConnectedSocket() client: Socket,
  ): void {
    const roomId = this.playersRoomsIds[client.id];
    this.rooms[roomId].started = true;
    this.rooms[roomId].monster = monster;
    this.emitRoom(roomId);
  }

  @SubscribeMessage('gameEvent')
  handleGameEvent(
    @MessageBody() event: any,
    @ConnectedSocket() client: Socket,
  ): void {
    const roomId = this.playersRoomsIds[client.id];
    if (event.eventType === 'useCapacity') {
      this.server.to(roomId).emit('gameEvent', event);
    } else {
      client.to(roomId).broadcast.emit('gameEvent', event);
    }
  }
}
