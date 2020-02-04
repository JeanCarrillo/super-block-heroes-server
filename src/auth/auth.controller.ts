import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/users-entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() user: User): Promise<any> {
    return this.authService.login(user);
  }
  @Post('token')
  async checkToken(@Body() token: any): Promise<any> {
    return this.authService.verifyToken(token) ;
  }
  @Post('register')
  async register(@Body() user: User): Promise<any> {
    return this.authService.register(user);
  }
}
