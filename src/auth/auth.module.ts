import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users-entity';
import { UsersService } from '../users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { Capacity } from 'src/capacities/capacities-entity';
import { CapacitiesService } from 'src/capacities/capacities.service';

console.log('AUTH MODULE');
console.log(process.env.JWT_SECRET);

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Capacity]),
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_SECRET,
      signOptions: { expiresIn: '600000000000s' },
    }),
  ],
  controllers: [AuthController],
  providers: [UsersService, AuthService, JwtStrategy, CapacitiesService],
})
export class AuthModule {}
