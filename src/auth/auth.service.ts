import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from  '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/users-entity';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
 constructor(
   private readonly usersService: UsersService,
   private readonly jwtService: JwtService
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

public async login(user: User): Promise< any | { status: number }>{
    return this.validate(user).then((userData)=>{

        console.log('PostPassword', user.password, 'userPasswordHashed', crypto.createHmac('sha256', user.password).digest('hex'));
        console.log({userData});

      if(!userData || userData.password !== crypto.createHmac('sha256', user.password).digest('hex')){
        return { status: 404 };
      }
      let payload = `${userData.id}`;
      const accessToken = this.jwtService.sign(payload);

      return {
         expires_in: 3600,
         access_token: accessToken,
         user_id: payload,
         status: 200
      };

    });
}

public async register(user: User): Promise<any>{
    return this.usersService.createUser({
        ...user,
        password: crypto.createHmac('sha256', user.password).digest('hex')
    })
} 

}