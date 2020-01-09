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

@WebSocketGateway()
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  playersRoomsIds: any = {};
  rooms: any = {};

  handleConnection(client: Socket): void {
    console.log('new user connected: ' + client.id);
  }

  handleDisconnect(client: Socket): void {
    console.log('a user disconnected: ' + client.id);
    this.leaveRoom(client);
  }

  // Triggered when a player goes to main menu : leave current room
  @SubscribeMessage('mainMenu')
  handleMainMenu(@ConnectedSocket() client: Socket): void {
    client.leave(this.playersRoomsIds[client.id]);
    this.leaveRoom(client);
  }

  private leaveRoom(client: Socket): void {
    console.log('leave room: ' + client.id);
    // If not registered in a room return
    const roomId = this.playersRoomsIds[client.id];
    if (!roomId) {
      return;
    }
    console.log({ roomId });

    // If player found in his registered room, delete it
    const playerIndex = this.getPlayerIndex(client.id, roomId);
    if (playerIndex !== -1) {
      this.rooms[roomId].players.splice(playerIndex, 1);
    }
    // If room is empty, delete room
    if (!this.rooms[roomId].players.length) {
      delete this.rooms[roomId];
    }
    // If player registered for that room, delete it
    if (this.playersRoomsIds[client.id]) {
      delete this.playersRoomsIds[client.id];
    }
    // If room exists, emit it
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
    const roomId = Date.now().toString();
    this.rooms[roomId] = {
      players: [],
      messages: [],
      monster: {},
      started: false,
    };
    return roomId;
  }

  @SubscribeMessage('join')
  handleJoin(
    @MessageBody() user: any,
    @ConnectedSocket() client: Socket,
  ): void {
    const currentRoomId = this.playersRoomsIds[client.id];
    if (currentRoomId) {
      return;
    }

    // Add socket id before storing user object
    user.socketId = client.id;
    // Clear confidential data if any
    user = clearSensibleData(user);

    const roomsKeys = Object.keys(this.rooms);
    let roomIdToJoin = null;

    // Look in all rooms until it finds a room with less than 4 players where the game isn't started yet
    roomsKeys.some(rk => {
      if (this.rooms[rk].players.length < 4 && !this.rooms[rk].started) {
        roomIdToJoin = rk;
        return true;
      }
    });

    // Register room ID in playersRoomsIds
    if (!roomIdToJoin) {
      roomIdToJoin = this.createRoom();
    }

    this.playersRoomsIds[client.id] = roomIdToJoin;

    // If player is NOT already in the room, push him into the room object
    try {
      this.rooms[roomIdToJoin].players.push(user);
    } catch (e) {
      console.log(e);
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
    console.log('start');
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
