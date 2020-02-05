import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/users-entity';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  //  async validate(email: string): Promise<any> {
  //    return this.usersService.getUserByEmail(email);
  //  }
  //  public async login(user: User): Promise<any | { status: number}> {
  //    return this.validate(user.email).then(userData => {
  //      let payload = `${userData.email}`;
  //      const accessToken= this.jwtService.sign(payload);
  //      return { expires_in: 3600, access_token: accessToken };
  //    });
  //  }

  public async validate(userData: User): Promise<User> {
    return await this.usersService.getUserByEmail(userData.email);
  }

  public async verifyToken(token: string) {
    console.log('token ', token);
    const verified = this.jwtService.decode(token);
    console.log({verified});
      
  }

  public async login(user: User): Promise<any | { status: number }> {
    console.log({ user });
    if (user.nickname !== '') {
      console.log('nickname');
      return this.usersService
        .getCredentialsWithNickname(user.nickname)
        .then(userData => {
          if (
            !userData ||
            userData.password !==
              crypto.createHmac('sha256', user.password).digest('hex')
          ) {
            return { status: 404 };
          }
          const payload = {
            id: userData.id,
            email: userData.email,
            nickname: userData.nickname,
          };
          return {
            access_token: this.jwtService.sign(payload),
          };
        });
    } else if (user.email !== '') {
      console.log('email');
      return this.usersService
        .getCredentialsWithEmail(user.email)
        .then(userData => {
          console.log({ userData });
          if (
            !userData ||
            userData.password !==
              crypto.createHmac('sha256', user.password).digest('hex')
          ) {
            console.log('pw failed');
            return { status: 404 };
          }
          const payload = {
            id: userData.id,
            email: userData.email,
            nickname: userData.nickname,
          };
          return {
            access_token: this.jwtService.sign(payload),
          };
        });
    } else {
      return { status: 404 };
    }
  }

  public async register(user: User): Promise<any> {
    return await this.usersService.createUser(user).then(async createdUser => {
      return await this.usersService.getUserByEmail(createdUser.email);
    });
  }
}
